const { utils } = require("../../utils")

const authUser = ({ username = null, password = null }) => {

  const encryptedUser =  utils.encrypt({ text: username })
  const encryptedPassword =  utils.encrypt({ text: password })

  const userPassword = utils.fakeDatabase.users[encryptedUser]

  return {
    success: userPassword === encryptedPassword
  }
}

module.exports = { authUser }
