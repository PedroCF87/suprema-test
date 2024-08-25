const jose = require('jose')

const jwtVerify = async props => {
    const { createSecretKey } = await import('node:crypto')
    try {
        const {
            jwt = null
        } = props
        const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8')
        if (!jwt) return false 
        const { payload, protectedHeader } = await jose.jwtVerify(jwt, secretKey)
        return { protectedHeader, payload }

    } catch (error) {
        if (error.code === 'ERR_JWS_INVALID') {
            return {
                error: {
                    code: 101,
                    message: 'Invalid Token'
                }
            }
        }
        if (error.code === 'ERR_JWT_EXPIRED') {
            return {
                error: {
                    code: 102,
                    message: 'Expired Token'
                }
            }
        }
        console.error('>>>>> JWT > jwtVerify > catch (error): ', error.code)
        return error.response.data || false
    }
}

module.exports = { jwtVerify }
