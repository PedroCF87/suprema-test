const CryptoJS = require('crypto-js')

const encrypt = props => {
    const { text = null } = props

    if (!text) return false

    return CryptoJS.SHA256(text).toString()
}

module.exports = { encrypt }
