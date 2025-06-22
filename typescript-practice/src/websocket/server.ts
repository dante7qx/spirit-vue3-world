import WebSocket from "ws"
import {JsonRpcNotification, JsonRpcRequest, JsonRpcResponse} from "../json-rpc/types"


// 错误代码常量
const ErrorCodes = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
} as const

// 方法处理器类型
type MethodHandler = (params?: any, clientWs?: WebSocket) => Promise<any> | any

// JSON-RPC 服务器类 - 用于处理 JSON-RPC 请求（批量）和通知
class JsonRpcWebSocketServer {
  private wss: WebSocket.Server
  private methods: Map<string, MethodHandler> = new Map()
  private clients: Set<WebSocket> = new Set()

  constructor(port: number = 8000) {
    this.wss = new WebSocket.Server({port})
    // 监听客户端连接事件
    this.setupServer()
    //  注册默认方法
    this.registerDefaultMethods()
  }

  private setupServer() {
    this.wss.on('connection', (ws, req) => {
      console.log('客户端已连接:', req.socket.remoteAddress, req.socket.remotePort, req.url)
      this.clients.add(ws)

      // 监听客户端消息事件
      ws.on('message', async (message) => {
        try {
          const msg = JSON.parse(message.toString())
          await this.handleClientMessage(ws, msg)
        } catch (e) {
          this.sendError(ws, ErrorCodes.PARSE_ERROR, '解析错误', null)
        }
      })

      // 监听客户端关闭事件
      ws.on('close', () => {
        console.log('客户端已断开连接')
        this.clients.delete(ws)
      })

      // 监听客户端错误事件
      ws.on('error', (error) => {
        console.error('WebSocket 客户端错误:', error)
        this.clients.delete(ws)
      })
    })
    console.log(`JSON-RPC WebSocket 服务器运行在端口 ${this.wss.options.port}`)
  }


  // 处理客户端消息 JSON-RPC 请求
  private async handleClientMessage(ws: WebSocket, message: WebSocket.Data): Promise<void> {
    // 处理批量请求
    if (Array.isArray(message)) {
      const responses = await Promise.all(
          message.map(req => this.processRequest(ws, req))
      )
      const validResponses = responses.filter(Boolean)
      if (validResponses.length > 0) {
        ws.send(JSON.stringify(validResponses))
      }
      return
    }

    // 处理单个请求
    const response = await this.processRequest(ws, message)
    if (response) {
      ws.send(JSON.stringify(response))
    }
  }

  /**
   * 处理WebSocket上的请求
   *
   * 此函数负责验证请求的合法性，检查请求的方法是否存在于服务器上，
   * 并调用相应的方法处理请求如果请求不合法或方法不存在，则返回相应的错误响应
   *
   * @param ws WebSocket实例，用于与客户端通信
   * @param request 任何类型的请求对象，应符合JsonRpcRequest的结构
   * @returns 返回一个Promise，解析为JsonRpcResponse对象或null（对于通知）
   */
  private async processRequest(ws: WebSocket, request: any): Promise<JsonRpcResponse | null> {

    // 验证请求格式
    if (!this.isValidRequest(request)) {
      return this.createErrorResponse(
          ErrorCodes.INVALID_REQUEST,
          '无效的请求格式',
          request.id || null
      )
    }

    const {method, params, id} = request as JsonRpcRequest

    // 检查方法是否存在
    if (!this.methods.has(method)) {
      return this.createErrorResponse(
          ErrorCodes.METHOD_NOT_FOUND,
          '服务端不支持请求的方法',
          id || null
      )
    }

    try {
      // ! 运算符通常用于 TypeScript，表示开发者确信 get(method) 方法不会返回 null 或 undefined, 避免 TypeScript 的类型检查错误
      const handle = this.methods.get(method)!
      const result = await handle(params, ws)

      // 如果是通知（没有id），则不返回响应
      if (id === undefined) return null

      return {
        jsonrpc: '2.0',
        result,
        id: id || null
      }
    } catch (error) {
      return this.createErrorResponse(
          ErrorCodes.INTERNAL_ERROR,
          'Internal error',
          id || null,
          error instanceof Error ? error.message : String(error)
      )
    }
  }

  // 验证请求格式合法且符合JSON-RPC 2.0 规范
  public isValidRequest(request: any): request is JsonRpcRequest {
    return (
        typeof request === 'object' && request !== null &&
        request.jsonrpc === '2.0' &&
        typeof request.method === 'string' &&
        (request.params === undefined || Array.isArray(request.params) || typeof request.params === 'object' || request.params === null)
    )
  }


  // 创建错误响应
  private createErrorResponse(
      code: number,
      message: string,
      id: string | number | null,
      data?: any
  ): JsonRpcResponse {
    return {
      jsonrpc: '2.0',
      error: {code, message, ...(data && {data})},
      id,
    }
  }

  // 发送错误响应
  private sendError(
      ws: WebSocket,
      code: number,
      message: string,
      id: string | number | null,
      data?: any
  ): void {
    const errorResponse = this.createErrorResponse(code, message, id, data)
    ws.send(JSON.stringify(errorResponse))
  }

  // 注册默认方法
  private registerDefaultMethods(): void {
    // 注册一些示例方法
    this.registerMethod('ping', () => 'pong')
    this.registerMethod('echo', (params) => params)
    this.registerMethod('add', (params) => {
      if (!Array.isArray(params) || params.length !== 2) {
        throw new Error('需要两个数字参数')
      }
      const [a, b] = params
      if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('参数必须是数字')
      }
      return a + b
    })
    this.registerMethod('getCurrentTime', () => new Date().toISOString())
    this.registerMethod('getConnectedClients', () => this.clients.size)
  }

  // 注册新方法
  public registerMethod(methodName: string, handler: MethodHandler): void {
    this.methods.set(methodName, handler);
  }

  // 向所有客户端广播通知
  public broadcast(method: string, params?: any): void {
    const notification: JsonRpcNotification = {
      jsonrpc: '2.0',
      method,
      params,
    };
    const message = JSON.stringify(notification);
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  // 向特定客户端发送通知
  public notify(ws: WebSocket, method: string, params?: any): void {
    if (ws.readyState === WebSocket.OPEN) {
      const notification: JsonRpcNotification = {
        jsonrpc: '2.0',
        method,
        params,
      };
      ws.send(JSON.stringify(notification))
    }
  }

  // 关闭服务器
  public close(): Promise<void> {
    return new Promise((resolve) => {
      this.wss.close(() => {
        console.log('服务器已关闭')
        resolve()
      })
    })
  }
}

// 示例：启动服务器、注册方法、广播消息
if (require.main === module) {
  const server = new JsonRpcWebSocketServer(8000)

  // 注册自定义方法
  server.registerMethod('getUserInfo', (params) => {
    const { userId } = params || {}
    if (!userId) {
      throw new Error('需要 userId 参数')
    }
    return {
      id: userId,
      name: `User ${userId}`,
      timestamp: Date.now(),
    }
  })

  // 每10秒广播一次时间
  setInterval(() => {
    server.broadcast('timeUpdate', { time: new Date().toISOString() });
  }, 10000)

  // 优雅关闭
  process.on('SIGINT', async () => {
    console.log('\n正在关闭服务器...')
    await server.close()
    process.exit(0)
  })

}

export default JsonRpcWebSocketServer

