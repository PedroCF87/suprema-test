const WebSocketServer = require('rpc-websockets').Server
const { utils } = require('./utils')

const server = new WebSocketServer({
  port: 8080,
  host: 'localhost'
})

console.log(">> Servidor de backend em execução.")

server.register('login', function({ username = null, password = null }) {

  const encryptedUser =  utils.encrypt({ text: username })
  const encryptedPassword =  utils.encrypt({ text: password })

  const userPassword = utils.fakeDatabase.users[encryptedUser]

  return {
    success: userPassword === encryptedPassword
  }
})
