const verifyConnection = (socket, req, authClientIds) => {
    let authorizedClientIds = authClientIds
    const { headers = null } = req
    if (
      !headers
      || !headers.upgrade
      || !headers.origin
    ) {
      // Tentativa de conexão não autorizada
      return authorizedClientIds
    }
  
    if (
      headers.upgrade !== 'websocket'                   // Protocolo inválido
      || headers.origin !== process.env.FRONTENDSERVER  // Domínio inválido
    ) {
      // Tentativa de conexão não autorizada
      return authorizedClientIds
    }
    /*
      Conexão autorizada
    */
    if (!authorizedClientIds.includes(socket._id)) {
      /*
        Caso não exista ainda, o ID da conexão é armazenada na lista de IDs autorizados do servidor
      */
      authorizedClientIds.push(socket._id)
    }
  
    return authorizedClientIds
}

module.exports = { verifyConnection }
