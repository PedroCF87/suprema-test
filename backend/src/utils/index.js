const { fakeDatabase } = require('./fakeDatabase')
const { encrypt } = require('./cryptoJs')

const utils = { fakeDatabase, encrypt }

module.exports = { utils }
