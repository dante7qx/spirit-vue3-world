# 基于TypeScript的JSON-RPC 2.0规范的SSE服务器，支持POST请求

## 核心功能
## 1. JSON-RPC 2.0 完全支持

- 支持标准的JSON-RPC 2.0请求和响应格式
- 支持方法调用、通知和错误处理
- 完整的类型定义和验证

## 2. SSE (Server-Sent Events)

- 实时双向通信
- 自动心跳保持连接
- 连接管理和状态监控
- 支持广播和单播消息

## 3. POST请求支持

- HTTP POST端点处理JSON-RPC请求
- CORS支持
- 错误处理和响应格式化

## 主要类和接口
`SSEJSONRPCServer`

- 主服务器类，继承自EventEmitter
- 管理SSE连接和JSON-RPC方法
- 支持方法注册、广播、连接管理

`SSEConnection`

- 单个SSE连接的管理类
- 处理心跳、事件发送和连接状态
- 支持JSON-RPC响应和通知发送

## 使用方法

### 1. 启动服务器
### 2. 访问端点
- SSE连接: GET http://localhost:8200/events
- JSON-RPC: POST http://localhost:8200/jsonrpc
- 客户端页面: 直接打开client.html
### 3. 注册自定义方法
```typescript
server.registerMethod('myMethod', (params, connection) => {
    // 处理逻辑
    return { result: 'success' };
})
```
### 内置方法

- ping: 返回'pong'
- getConnections: 获取所有连接ID
- broadcast: 广播消息到所有连接
- echo: 回显参数
- getCurrentTime: 获取当前时间
- calculate: 计算器功能

### 客户端示例
提供了完整的HTML客户端，支持：

- SSE连接管理
- JSON-RPC请求发送
- 实时日志显示
- 各种预定义操作