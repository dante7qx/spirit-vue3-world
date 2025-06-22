import { createServer as createHTTPServer } from 'http'
import { createServer, createHTTPHandler } from './server'

const port = 8200
const rpcServer = createServer()
const httpHandler = createHTTPHandler(rpcServer)

const httpServer = createHTTPServer(httpHandler)

httpServer.listen(port, () => {
  console.log(`JSON-RPC SSE Server running on http://localhost:${port}`)
  console.log(`SSE endpoint: http://localhost:${port}/events`)
  console.log(`JSON-RPC endpoint: http://localhost:${port}/jsonrpc`)
})

// 定期广播消息
setInterval(() => {
  rpcServer.broadcastNotification({
    jsonrpc: '2.0',
    method: 'serverTime',
    params: {
      timestamp: Date.now(),
      message: 'Server time update'
    }
  })
}, 10000)