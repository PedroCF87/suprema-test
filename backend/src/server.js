const WebSocketServer = require('rpc-websockets').Server
const { controllers } = require('./controllers')
const { middlewares } = require('./middlewares')
const { utils } = require('./utils')

const server = new WebSocketServer({
  port: 8080,
  host: 'localhost'
})

let authorizedClientIds = []

console.log(">> Servidor de backend em execução.")

server.on('connection', (socket, req) => {
  authorizedClientIds = middlewares.verifyConnection(socket, req, authorizedClientIds)
})

server.setAuth(({ authorization: jwt = null }, socketId) => 
  middlewares.authServer(jwt, socketId, authorizedClientIds)
)

server.register('login', controllers.authUser).protected()
