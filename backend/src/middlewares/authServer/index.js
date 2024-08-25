const { utils } = require("../../utils")

const authServer = async (jwt, socketId, authorizedClientIds) => {
    try {
      if (!authorizedClientIds.includes(socketId)) {
        /*
          Caso o ID da conexão não exista na lista de IDs autorizados,
          a conexão é recusada.
        */
        return false // Conexão é recusada!
      }
  
      const {
        payload = null, // Objeto contido no token JWT
        error = null    // Mensagem de erro
      } = await utils.jwtVerify({ jwt })
  
      if (
        error
        || !payload.UID
      ) {
        /*
          A validação do token JWT gerou um erro
          ou o conteúdo extraído não tem o UID do servidor.
        */
        return false // Conexão é recusada!
      }
  
      if (!JSON.parse(process.env.UIDS).includes(payload.UID)) {
        /*
          A lista de UIDs dos servidores de frontend
          não contém o UID do servidor que está tentando logar.
        */
        return false // Conexão é recusada!
      }
    
      return true
      
    } catch (error) {
      return false // Conexão é recusada!
    }
}

module.exports = { authServer }
