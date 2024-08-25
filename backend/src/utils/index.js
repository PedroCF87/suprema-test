const { fakeDatabase } = require('./fakeDatabase')
const { encrypt } = require('./cryptoJs')
const { jwtVerify } = require('./joseJwt')

const utils = {
    fakeDatabase,
    encrypt,
    jwtVerify
}

module.exports = { utils }
