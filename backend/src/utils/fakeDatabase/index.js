require('dotenv').config()

const fakeDatabase = {
    authTokens: JSON.parse(process.env.AUTHTOKENS) || [],
    users: JSON.parse(process.env.USERS) || {},
    uids: JSON.parse(process.env.UIDS) || []
}

module.exports = { fakeDatabase }
