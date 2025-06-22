
// JSON-RPC 2.0 类型定义
export interface JsonRpcRequest {
  jsonrpc: '2.0'
  method: string
  params?: any[] | Record<string, any>
  id?: string | number | null // 请求和响应之间的唯一标识符，每个请求必须包含一个 id，服务器返回响应时也必须携带相同的 id，客户端据此判断是哪个请求的响应
}

export interface JsonRpcResponse {
  jsonrpc: '2.0'
  result?: any
  error?: JsonRpcError
  id: string | number | null  // 响应的 id 必须与请求的 id 相同
}

export interface JsonRpcError {
  code: number
  message: string
  data?: any
}

export interface JsonRpcNotification {
  jsonrpc: '2.0'
  method: string
  params?: any[] | Record<string, any>
}

/**
 * 表示一个待处理的 JSON-RPC 请求。
 * 当客户端发送一个 JSON-RPC 请求后，会创建一个 PendingRequest 实例来跟踪该请求的状态，
 * 并在收到服务器响应时使用 resolve 或 reject 方法处理响应结果。
 */
export interface PendingRequest {
  /**
   * 当 JSON-RPC 请求成功并收到服务器返回的结果时，调用此方法来解析请求。
   * @param result - 服务器返回的请求结果，类型为任意类型。
   */
  resolve: (result: any) => void

  /**
   * 当 JSON-RPC 请求失败，服务器返回错误信息时，调用此方法来拒绝请求。
   * @param error - 包含错误信息的 JsonRpcError 对象。
   */
  reject: (error: JsonRpcError) => void

  /**
   * 可选的超时定时器。用于设置请求的超时时间，当超过指定时间仍未收到服务器响应时，
   * 可以触发超时处理逻辑，调用 reject 方法拒绝请求。
   */
  timeout?: NodeJS.Timeout
}