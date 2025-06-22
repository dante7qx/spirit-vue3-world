import {IncomingMessage, ServerResponse} from "http"
import {EventEmitter} from "events"
import {JsonRpcNotification, JsonRpcRequest, JsonRpcResponse} from "../json-rpc/types"

// SSE 客户端连接管理器
class SSEConnection {
  private response: ServerResponse
  private id: string
  private isAlive: boolean = true     // 连接是否存活

  constructor(response: ServerResponse, id: string) {
    this.response = response
    this.id = id
    this.setupSSE()
  }

  private setupSSE(): void {
    // 设置 SSE 响应头, 允许跨域访问
    this.response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    })

    // 发送初始连接确认
    this.sendEvent('connected', {connectionId: this.id})

    // 定期发送心跳
    const heartbeat = setInterval(() => {
      if (this.isAlive) {
        this.sendEvent('ping', {timestamp: Date.now()});
      } else {
        clearInterval(heartbeat);
      }
    }, 30000);

    // 处理客户端断开连接
    this.response.on('close', () => {
      this.isAlive = false
      clearInterval(heartbeat)
    })
  }

  /**
   * 发送事件及其数据到响应流中
   * 此函数用于向客户端推送事件和相关数据，采用Server-Sent Events (SSE) 的方式
   * 当事件发送时，会检查当前连接是否存活，若不存活则不执行任何操作
   *
   * @param event - 要发送的事件名称，作为一个字符串传递
   * @param data - 与事件相关的数据，可以是任何类型，将被序列化为JSON字符串
   */
  sendEvent(event: string, data: any): void {
    if (!this.isAlive) return;
    try {
      // 写入事件类型到响应流中，按照SSE的格式
      this.response.write(`event: ${event}\n`)
      // 写入数据到响应流中，数据被序列化为JSON字符串，遵循SSE格式
      this.response.write(`data: ${JSON.stringify(data)}\n\n`)
    } catch (error) {
      this.isAlive = false
    }
  }

  sendJSONRPCResponse(response: JsonRpcResponse): void {
    this.sendEvent('jsonrpc-response', response);
  }

  sendJSONRPCNotification(notification: JsonRpcNotification): void {
    this.sendEvent('jsonrpc-notification', notification);
  }

  close(): void {
    if (this.isAlive) {
      this.isAlive = false
      this.response.end()
    }
  }

  getId(): string {
    return this.id
  }

  isConnected(): boolean {
    return this.isAlive
  }

}

// JSON-RPC 方法处理器类型
type JSONRPCMethodHandler = (
    params: any,
    connection: SSEConnection
) => Promise<any> | any

// SSE JSON-RPC 服务器
export class SSEJsonRpcServer extends EventEmitter {
  private connections: Map<string, SSEConnection> = new Map()
  private methods: Map<string, JSONRPCMethodHandler> = new Map()
  private connectionCounter: number = 0                           // 用于生成连接ID

  // 注册默认方法
  private registerDefaultMethods(): void {
    this.registerMethod('ping', () => 'pong')

    this.registerMethod('getConnections', () => {
      return Array.from(this.connections.keys())
    });

    this.registerMethod('broadcast', (params: { message: string }) => {
      if (!params) {
        throw new Error('Invalid parameters: message is required')
      }
      this.broadcast('broadcast', {message: params.message})
      return {sent: this.connections.size}
    })
  }

  // 注册JSON-RPC方法
  registerMethod(method: string, handler: JSONRPCMethodHandler): void {
    this.methods.set(method, handler)
  }

  // 处理SSE连接
  handleSSEConnection(request: IncomingMessage, response: ServerResponse): void {
    const connectionId = `conn_${++this.connectionCounter}_${Date.now()}`
    const connection = new SSEConnection(response, connectionId)

    this.connections.set(connectionId, connection)
    this.emit('connection', connection)

    // 监听连接关闭
    response.on('close', () => {
      this.connections.delete(connectionId)
      this.emit('disconnection', connectionId)
    })
  }

  // 处理POST请求中的JSON-RPC调用
  async handleJSONRPCRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
    try {
      const body = await this.parseRequestBody(request)
      const rpcRequest = JSON.parse(body) as JsonRpcRequest

      // 验证JSON-RPC格式
      if (!this.isValidJSONRPCRequest(rpcRequest)) {
        this.sendHTTPError(response, 400, 'Invalid JSON-RPC request')
        return
      }

      // 处理请求
      const rpcResponse = await this.processJSONRPCRequest(rpcRequest)

      // 发送HTTP响应
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      response.end(JSON.stringify(rpcResponse))

    } catch (error) {
      this.sendHTTPError(response, 500, 'Internal server error')
    }
  }

  private parseRequestBody(request: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(body);
      });
      request.on('error', reject);
    });
  }

  // 验证JSON-RPC请求格式
  private isValidJSONRPCRequest(request: any): request is JsonRpcRequest {
    return (
        request &&
        request.jsonrpc === '2.0' &&
        typeof request.method === 'string' &&
        (request.id === undefined ||
            request.id === null ||
            typeof request.id === 'string' ||
            typeof request.id === 'number')
    )
  }

  // 处理JSON-RPC请求
  private async processJSONRPCRequest(request: JsonRpcRequest): Promise<JsonRpcResponse> {
    const {method, params, id} = request
    const responseId = id !== undefined ? id : null

    try {
      // 检查方法是否存在
      const handler = this.methods.get(method);
      if (!handler) {
        return {
          jsonrpc: '2.0',
          error: {
            code: -32601,
            message: 'Method not found',
          },
          id: responseId,
        }
      }

      // 执行方法
      const result = await handler(params, this.getFirstConnection()!);

      return {
        jsonrpc: '2.0',
        result,
        id: responseId,
      }

    } catch (error) {
      return {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal error',
          data: error instanceof Error ? error.message : String(error),
        },
        id: responseId,
      }
    }
  }

  // 获取第一个连接（用于POST请求处理）
  private getFirstConnection(): SSEConnection | null {
    const firstConnection = this.connections.values().next().value;
    return firstConnection || null;
  }

  // 发送HTTP错误响应
  private sendHTTPError(response: ServerResponse, status: number, message: string): void {
    response.writeHead(status, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    response.end(JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: status,
        message,
      },
      id: null,
    }))
  }

  // 广播消息到所有连接
  broadcast(event: string, data: any): void {
    for (const connection of this.connections.values()) {
      if (connection.isConnected()) {
        connection.sendEvent(event, data)
      }
    }
  }

  // 发送JSON-RPC通知到所有连接
  broadcastNotification(notification: JsonRpcNotification): void {
    for (const connection of this.connections.values()) {
      if (connection.isConnected()) {
        connection.sendJSONRPCNotification(notification)
      }
    }
  }

  // 发送JSON-RPC通知到特定连接
  sendNotificationToConnection(connectionId: string, notification: JsonRpcNotification): boolean {
    const connection = this.connections.get(connectionId)
    if (connection && connection.isConnected()) {
      connection.sendJSONRPCNotification(notification)
      return true
    }
    return false
  }

  // 获取连接数
  getConnectionCount(): number {
    return this.connections.size
  }

  // 获取所有连接ID
  getConnectionIds(): string[] {
    return Array.from(this.connections.keys())
  }

  // 关闭特定连接
  closeConnection(connectionId: string): boolean {
    const connection = this.connections.get(connectionId)
    if (connection) {
      connection.close()
      this.connections.delete(connectionId)
      return true
    }
    return false
  }

  // 关闭所有连接
  closeAllConnections(): void {
    for (const connection of this.connections.values()) {
      connection.close()
    }
    this.connections.clear()
  }
}

// 示例: 启动服务器、注册方法并处理请求、广播消息等
export function createServer() {
  const server = new SSEJsonRpcServer()

  // 注册自定义方法
  server.registerMethod('echo', (params) => {
    return {echo: params}
  })

  server.registerMethod('getCurrentTime', () => {
    return {timestamp: Date.now(), date: new Date().toISOString()}
  })

  server.registerMethod('calculate', (params: { operation: string; a: number; b: number }) => {
    if (!params) {
      throw new Error('Invalid parameters: a and b must be numbers');
    }

    switch (params.operation) {
      case 'add':
        return {result: params.a + params.b}
      case 'subtract':
        return {result: params.a - params.b}
      case 'multiply':
        return {result: params.a * params.b}
      case 'divide':
        if (params.b === 0) throw new Error('Division by zero')
        return {result: params.a / params.b}
      default:
        throw new Error('Unsupported operation')
    }
  })

  // 监听连接事件
  server.on('connection', (connection) => {
    console.log(`New SSE connection: ${connection.getId()}`);

    // 发送欢迎消息
    connection.sendJSONRPCNotification({
      jsonrpc: '2.0',
      method: 'welcome',
      params: {message: 'Welcome to JSON-RPC SSE server!'}
    })
  })

  server.on('disconnection', (connectionId) => {
    console.log(`SSE connection closed: ${connectionId}`)
  })

  return server

}

// HTTP服务器集成示例
export function createHTTPHandler(server: SSEJsonRpcServer) {
  return async (request: IncomingMessage, response: ServerResponse) => {
    const url = new URL(request.url || '', `http://${request.headers.host}`);

    // 设置CORS头
    if (request.method === 'OPTIONS') {
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
      response.end()
      return
    }

    // 处理SSE连接
    if (request.method === 'GET' && url.pathname === '/events') {
      server.handleSSEConnection(request, response)
      return
    }

    // 处理JSON-RPC POST请求
    if (request.method === 'POST' && url.pathname === '/jsonrpc') {
      await server.handleJSONRPCRequest(request, response)
      return
    }

    // 404处理
    response.writeHead(404, {'Content-Type': 'text/plain'})
    response.end('Not Found')
  }
}



