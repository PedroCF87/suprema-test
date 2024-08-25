const { verifyConnection } = require('./verifyConnection')
const { authServer } = require('./authServer')

const middlewares = {
    verifyConnection,
    authServer
}

module.exports = { middlewares }
