// 服务端聊天室实现
import WebSocket from "ws"
import JsonRpcWebSocketServer from "../server"

const server = new JsonRpcWebSocketServer(8100);
const chatRooms = new Map<string, Set<WebSocket>>();

/**
 * 注册方法 - 用户加入聊天室
 */
server.registerMethod('joinRoom', (params, ws) => {
  const {roomId, username} = params

  if (!chatRooms.has(roomId)) {
    chatRooms.set(roomId, new Set())
  }
  chatRooms.get(roomId)!.add(ws!)
  console.log(`用户 ${username} 加入了房间 ${roomId}`)
  console.log(`当前房间 ${roomId} 有 ${chatRooms.get(roomId)!.size} 人`)
  // 通知房间内其他用户有新用户加入
  chatRooms.get(roomId)!.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      server.notify(client, 'userJoined', {username, roomId})
    }
  })
  return {success: true, message: `已加入房间 ${roomId}`}
})

/**
 * 注册方法 - 发送消息
 */
server.registerMethod('sendMessage', (params, _ws) => {
  const {roomId, username, message} = params

  if (chatRooms.has(roomId)) {
    chatRooms.get(roomId)!.forEach(client => {
      if (client && client.readyState === WebSocket.OPEN) {
        server.notify(client, 'newMessage', {
          username,
          message,
          timestamp: Date.now()
        })
      }
    })
  }
  return {success: true}
})