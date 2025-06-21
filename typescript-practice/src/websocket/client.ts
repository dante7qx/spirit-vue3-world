import { EventEmitter } from 'events'
import WebSocket from 'ws'
import {JsonRpcNotification, JsonRpcRequest, JsonRpcResponse, PendingRequest} from "./types"

class JsonRpcWebSocketClient extends EventEmitter {
  private ws: WebSocket | null = null
  private pendingRequests: Map<string | number, PendingRequest> = new Map()
  private requestId: number = 1                     // 用于生成唯一的请求ID
  private reconnectAttempts: number = 0             // 当前重连尝试次数，初始值为0
  private maxReconnectAttempts: number = 5          // 最大允许的重连尝试次数，默认设置为5次
  private reconnectDelay: number = 1000             // 重连延迟，默认设置为1秒
  private requestTimeout: number = 30000            // 30秒超时
  private url: string                               // WebSocket Server 地址
  private isManualClose: boolean = false

  constructor(url: string) {
    super()
    this.url = url
  }

  // 创建一个WebSocket连接, 连接到服务器
  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url)
        this.setupEventHandlers()

        this.ws.once('open', () => {
          console.log('已连接到服务器')
          this.reconnectAttempts = 0;
          this.emit('connected')
          resolve()
        })

        this.ws.once('error', (error) => {
          console.error('连接错误:', error)
          reject(error)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  // 设置事件处理程序, 包括连接、错误、关闭和消息事件
  public setupEventHandlers(): void {
    if (!this.ws) return

    this.ws.on('message', (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString())
        this.handleMessage(message)
      } catch (error) {
        console.error('解析消息失败:', error)
      }
    })

    this.ws.on('close', (code: number, reason: Buffer) => {
      console.log(`连接已关闭: ${code} - ${reason.toString()}`)
      this.emit('disconnected', code, reason.toString())

      // 清理待处理的请求
      this.pendingRequests.forEach(({ reject, timeout }) => {
        if (timeout) clearTimeout(timeout)
        reject({
          code: -32000,
          message: 'Connection closed',
        })
      })
      this.pendingRequests.clear()

      // 自动重连
      if (!this.isManualClose) {
        this.attemptReconnect()
      }
    })

    this.ws.on('error', (error: Error) => {
      console.error('WebSocket 错误:', error)
      this.emit('error', error)
    })
  }

  // 处理消息，确保消息是JSON格式的
  public handleMessage(message: any): void {
    // 处理批量响应
    if (Array.isArray(message)) {
      message.forEach(msg => this.processMessage(msg))
      return
    }
    this.processMessage(message)
  }

  public processMessage(message: string): void {
    // 检查是否是通知
    if (this.isNotification(message)) {
      this.emit('notification', message.method, message.params)
      return
    }

    // 检查是否是响应
    if (this.isResponse(message)) {
      const { id, result, error } = message as JsonRpcResponse;
      const pendingRequest = this.pendingRequests.get(id!)

      if (pendingRequest) {
        if (pendingRequest.timeout) {
          clearTimeout(pendingRequest.timeout);
        }
        this.pendingRequests.delete(id!)

        if (error) {
          pendingRequest.reject(error)
        } else {
          pendingRequest.resolve(result)
        }
      }
      return
    }

    console.warn('收到未知消息格式:', message)

  }

  private isNotification(message: any): message is JsonRpcNotification {
    return (
        typeof message === 'object' &&
        message !== null &&
        message.jsonrpc === '2.0' &&
        typeof message.method === 'string' &&
        message.id === undefined
    )
  }

  private isResponse(message: any): message is JsonRpcResponse {
    return (
        typeof message === 'object' &&
        message !== null &&
        message.jsonrpc === '2.0' &&
        (message.result !== undefined || message.error !== undefined) &&
        message.id !== undefined
    )
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('达到最大重连次数，停止重连')
      this.emit('reconnectFailed')
      return
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`${delay}ms 后尝试第 ${this.reconnectAttempts} 次重连...`)

    setTimeout(async () => {
      try {
        await this.connect()
        console.log('重连成功')
        this.emit('reconnected')
      } catch (error) {
        console.error('重连失败:', error)
        this.attemptReconnect()
      }
    }, delay)
  }

  // 发送请求并等待响应
  public async request(method: string, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket 未连接'))
        return
      }

      const id = this.requestId++
      const request: JsonRpcRequest = {
        jsonrpc: '2.0',
        method,
        params,
        id,
      }

      // 设置超时
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(id)
        reject({
          code: -32000,
          message: '请求超时',
        })
      }, this.requestTimeout)

      this.pendingRequests.set(id, { resolve, reject, timeout })

      try {
        this.ws.send(JSON.stringify(request))
      } catch (error) {
        clearTimeout(timeout)
        this.pendingRequests.delete(id)
        reject(error)
      }
    })
  }

  // 发送通知（不等待响应）
  public notify(method: string, params?: any): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket 未连接')
    }
    const notification: JsonRpcNotification = {
      jsonrpc: '2.0',
      method,
      params,
    }
    this.ws.send(JSON.stringify(notification))
  }

  // 发送批量请求
  public async batchRequest(requests: Array<{ method: string; params?: any }>): Promise<any[]> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket 未连接')
    }
    const batchRequests: JsonRpcRequest[] = requests.map(({ method, params }) => ({
      jsonrpc: '2.0',
      method,
      params,
      id: this.requestId++,
    }))
    const promises = batchRequests.map(request =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          this.pendingRequests.delete(request.id!);
          reject({
            code: -32000,
            message: '请求超时',
          })
        }, this.requestTimeout)

        this.pendingRequests.set(request.id!, { resolve, reject, timeout })
      })
    )
    try {
      this.ws.send(JSON.stringify(batchRequests))
      return await Promise.all(promises)
    } catch (error) {
      // 清理待处理的请求
      batchRequests.forEach(request => {
        const pending = this.pendingRequests.get(request.id!)
        if (pending?.timeout) {
          clearTimeout(pending.timeout)
        }
        this.pendingRequests.delete(request.id!)
      })
      throw error
    }
  }

  // 检查连接状态
  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }

  // 设置请求超时时间
  public setRequestTimeout(timeout: number): void {
    this.requestTimeout = timeout
  }

  // 设置重连参数
  public setReconnectConfig(maxAttempts: number, delay: number): void {
    this.maxReconnectAttempts = maxAttempts
    this.reconnectDelay = delay
  }

  // 手动关闭连接
  public close(): void {
    this.isManualClose = true
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  // 获取连接状态信息
  public getConnectionInfo(): {
    isConnected: boolean
    reconnectAttempts: number
    pendingRequests: number
  } {
    return {
      isConnected: this.isConnected(),
      reconnectAttempts: this.reconnectAttempts,
      pendingRequests: this.pendingRequests.size,
    }
  }
}

// 使用示例
if(require.main === module) {
  console.log('=======================>> Starting client...')
  async function main() {
    const client = new JsonRpcWebSocketClient('ws://localhost:8000')
    // 监听事件
    client.on('connected', () => {
      console.log('✅ 客户端已连接')
    })
    client.on('disconnected', (code, reason) => {
      console.log(`❌ 客户端已断开连接: ${code} - ${reason}`)
    })
    client.on('notification', (method, params) => {
      console.log(`📢 收到通知: ${method}`, params)
    })
    client.on('error', (error) => {
      console.error('❗ 客户端错误:', error)
    })
    client.on('reconnected', () => {
      console.log('🔄 重连成功')
    })

    try {
      // 连接到服务器
      await client.connect()
      // 发送请求
      console.log('\n--- 发送请求示例 ---')

      const pingResult = await client.request('ping')
      console.log('ping 结果:', pingResult)

      const addResult = await client.request('add', [5, 3])
      console.log('5 + 3 =', addResult)

      const timeResult = await client.request('getCurrentTime')
      console.log('当前时间:', timeResult)

      const clientsCount = await client.request('getConnectedClients')
      console.log('连接的客户端数量:', clientsCount)

      // 批量请求
      console.log('\n--- 批量请求示例 ---')
      const batchResults = await client.batchRequest([
        { method: 'ping' },
        { method: 'add', params: [10, 20] },
        { method: 'getCurrentTime' },
      ])
      console.log('批量请求结果:', batchResults)

      // 发送通知
      console.log('\n--- 发送通知示例 ---')
      client.notify('clientMessage', { message: '来自客户端的消息' })

      // 保持连接以接收服务器通知
      console.log('\n等待服务器通知... (按 Ctrl+C 退出)')

    } catch (error) {
      console.error('操作失败:', error)
    }

    // 优雅关闭
    process.on('SIGINT', () => {
      console.log('\n正在关闭客户端...')
      client.close();
      process.exit(0)
    })
  }
  main().catch(console.error)
}

export default JsonRpcWebSocketClient
