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