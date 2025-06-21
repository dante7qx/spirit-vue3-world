# JSON-RPC 2.0 WebSocket 实现

这是一个完整的 TypeScript 实现，包含了遵循 JSON-RPC 2.0 协议的 WebSocket 服务端和客户端。

## 功能特性

### 服务端功能
- ✅ 完全遵循 JSON-RPC 2.0 协议规范
- ✅ 支持方法调用、通知和批量请求
- ✅ 自动错误处理和验证
- ✅ 支持自定义方法注册
- ✅ 客户端连接管理
- ✅ 广播通知功能
- ✅ 优雅关闭处理

### 客户端功能
- ✅ 自动重连机制
- ✅ 请求超时处理
- ✅ 批量请求支持
- ✅ 事件驱动架构
- ✅ 连接状态监控
- ✅ 通知接收处理

## 安装和运行

### 1. 安装依赖
```bash
pnpm add ws @types/ws uuid
```

### 2. 开发模式运行

编译项目：
```bash
pnpm exec tsc
```

启动服务端：
```bash
pnpm ws:server
```

启动客户端（新终端）：
```bash
pnpm ws:client
```

## 使用示例

### 服务端使用

```typescript
import JsonRpcWebSocketServer from './server';

const server = new JsonRpcWebSocketServer(8080);

// 注册自定义方法
server.registerMethod('multiply', (params) => {
  const [a, b] = params;
  return a * b;
});

// 广播通知
server.broadcast('serverMessage', { text: '服务器消息' });
```

### 客户端使用

```typescript
import JsonRpcWebSocketClient from './client';

const client = new JsonRpcWebSocketClient('ws://localhost:8080');

// 连接并发送请求
async function example() {
  await client.connect();
  
  // 方法调用
  const result = await client.request('add', [1, 2]);
  console.log('结果:', result); // 输出: 3
  
  // 发送通知
  client.notify('clientHeartbeat', { timestamp: Date.now() });
  
  // 批量请求
  const results = await client.batchRequest([
    { method: 'ping' },
    { method: 'add', params: [5, 10] }
  ]);
}
```

## JSON-RPC 2.0 协议支持

### 请求格式
```json
{
  "jsonrpc": "2.0",
  "method": "add",
  "params": [1, 2],
  "id": 1
}
```

### 响应格式
```json
{
  "jsonrpc": "2.0",
  "result": 3,
  "id": 1
}
```

### 错误响应
```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32601,
    "message": "Method not found"
  },
  "id": 1
}
```

### 通知格式
```json
{
  "jsonrpc": "2.0",
  "method": "notification",
  "params": { "message": "这是一个通知" }
}
```

### 批量请求
```json
[
  {"jsonrpc": "2.0", "method": "ping", "id": 1},
  {"jsonrpc": "2.0", "method": "add", "params": [1, 2], "id": 2}
]
```

## 内置方法

服务端预定义了以下方法：

| 方法名 | 参数 | 返回值 | 描述 |
|--------|------|--------|------|
| `ping` | 无 | `"pong"` | 连接测试 |
| `echo` | 任意 | 原样返回参数 | 回声测试 |
| `add` | `[number, number]` | `number` | 两数相加 |
| `getCurrentTime` | 无 | `string` | 获取当前时间 |
| `getConnectedClients` | 无 | `number` | 获取连接的客户端数量 |

## 错误代码

遵循 JSON-RPC 2.0 标准错误代码：

| 代码 | 消息 | 含义 |
|------|------|------|
| -32700 | Parse error | 解析错误 |
| -32600 | Invalid Request | 无效请求 |
| -32601 | Method not found | 方法未找到 |
| -32602 | Invalid params | 无效参数 |
| -32603 | Internal error | 内部错误 |

## 事件系统

### 客户端事件

```typescript
client.on('connected', () => {
  console.log('已连接到服务器');
});

client.on('disconnected', (code, reason) => {
  console.log(`连接断开: ${code} - ${reason}`);
});

client.on('notification', (method, params) => {
  console.log(`收到通知: ${method}`, params);
});

client.on('error', (error) => {
  console.error('客户端错误:', error);
});

client.on('reconnected', () => {
  console.log('重连成功');
});

client.on('reconnectFailed', () => {
  console.log('重连失败');
});
```

## 高级功能

### 自动重连配置

```typescript
// 设置最大重连次数和延迟时间
client.setReconnectConfig(10, 2000); // 最多10次，延迟2秒
```

### 请求超时设置

```typescript
// 设置请求超时时间为60秒
client.setRequestTimeout(60000);
```

### 连接状态监控

```typescript
const info = client.getConnectionInfo();
console.log('连接信息:', info);
// 输出: { isConnected: true, reconnectAttempts: 0, pendingRequests: 2 }
```

### 服务端广播示例

```typescript
// 向所有客户端广播
server.broadcast('announcement', {
  message: '系统维护通知',
  timestamp: Date.now()
});

// 向特定客户端发送通知
server.notify(specificWebSocket, 'privateMessage', {
  content: '这是私人消息'
});
```

## 完整示例应用

### 聊天室示例

```typescript
// 服务端聊天室实现
const server = new JsonRpcWebSocketServer(8080);
const chatRooms = new Map<string, Set<WebSocket>>();

server.registerMethod('joinRoom', (params, ws) => {
  const { roomId, username } = params;
  
  if (!chatRooms.has(roomId)) {
    chatRooms.set(roomId, new Set());
  }
  
  chatRooms.get(roomId)!.add(ws);
  
  // 通知房间内其他用户
  chatRooms.get(roomId)!.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      server.notify(client, 'userJoined', { username, roomId });
    }
  });
  
  return { success: true, message: `已加入房间 ${roomId}` };
});

server.registerMethod('sendMessage', (params, ws) => {
  const { roomId, message, username } = params;
  
  if (chatRooms.has(roomId)) {
    chatRooms.get(roomId)!.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        server.notify(client, 'newMessage', {
          username,
          message,
          timestamp: Date.now()
        });
      }
    });
  }
  
  return { success: true };
});
```

### 客户端聊天室使用

```typescript
import {v4 as uuidv4} from 'uuid'
import JsonRpcWebSocketClient from "../client"

const CHAT_ROOM_ID = `spirit-${uuidv4()}`

// 为每个用户创建独立的客户端
async function createUserClient(username: string) {
  const client = new JsonRpcWebSocketClient('ws://localhost:8100')

  // 监听聊天消息
  client.on('notification', (method, params) => {
    switch (method) {
      case 'newMessage':
        console.log(`[${username}收到] ${params.username}: ${params.message}`)
        break;
      case 'userJoined':
        console.log(`[${username}收到] ${params.username} 加入了房间`)
        break;
    }
  })
  await client.connect()
  return client
}

async function joinChatRoom(username: string): Promise<JsonRpcWebSocketClient> {
  const client = await createUserClient(username);

  // 加入房间
  await client.request('joinRoom', ({
    roomId: CHAT_ROOM_ID,
    username: username
  }))

  // 发送消息
  await client.request('sendMessage', {
    roomId: CHAT_ROOM_ID,
    username: username,
    message: '大家好！'
  })

  return client
}

Promise.all([
  joinChatRoom('苏倩婉'),
  joinChatRoom('但丁'),
  joinChatRoom('爱丽丝'),
]).catch(err => console.error('加入聊天室错误:', err))
```

## 测试

创建测试文件来验证功能：

```typescript
// tests/integration.test.ts
import JsonRpcWebSocketServer from '../src/server';
import JsonRpcWebSocketClient from '../src/client';

describe('JSON-RPC WebSocket Integration', () => {
  let server: JsonRpcWebSocketServer;
  let client: JsonRpcWebSocketClient;
  
  beforeAll(async () => {
    server = new JsonRpcWebSocketServer(9999);
    client = new JsonRpcWebSocketClient('ws://localhost:9999');
    await client.connect();
  });
  
  afterAll(async () => {
    client.close();
    await server.close();
  });
  
  test('ping-pong', async () => {
    const result = await client.request('ping');
    expect(result).toBe('pong');
  });
  
  test('add numbers', async () => {
    const result = await client.request('add', [5, 3]);
    expect(result).toBe(8);
  });
  
  test('batch request', async () => {
    const results = await client.batchRequest([
      { method: 'ping' },
      { method: 'add', params: [1, 2] }
    ]);
    expect(results).toEqual(['pong', 3]);
  });
});
```

## 部署建议

### Docker 部署

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
EXPOSE 8080

CMD ["npm", "start"]
```

### 环境变量配置

```typescript
// 支持环境变量配置
const port = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8080;
const server = new JsonRpcWebSocketServer(port);
```

### 生产环境优化

1. **启用压缩**: 在 WebSocket 选项中启用压缩
2. **连接限制**: 实现连接数限制和速率限制
3. **日志记录**: 集成专业日志库如 Winston
4. **监控**: 添加性能监控和健康检查端点
5. **安全**: 实现身份验证和授权机制

这个实现提供了一个完整、可扩展的 JSON-RPC 2.0 WebSocket 解决方案，适用于各种实时通信场景。