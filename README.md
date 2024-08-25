# Teste de Desenvolvedor Back-End

Nessa etapa vamos desenvolver apenas uma funcionalidade utilizando Node, Websocket e RPC.

## Requisitos

1. Crie uma aplicação em Node JS que possibilite o usuário realizar Login passando usuário e senha. Você não precisará de banco de dados, poderá armazenar em memória os dados do usuário para devida autenticação.
2. A autenticação deverá ser realizada a partir de uma conexão WebSocket.
3. O back-end deverá expor apenas comunicação através de uma conexão RPC.
4. Para finalizar você deverá implementar um cliente independente de linguagem de programação para que possamos testar o Login.

## Arquitetura

![arquitetura](https://raw.githubusercontent.com/PedroCF87/suprema-test/main/docs/arquitetura.png)

## Tecnologias

### Frontend

O frontend foi desenvolvido usando o React com o framework Next.js.

### Backend

O backend foi desenvolvido usando o Node.js com a biblioteca NPM rpc-websockets.

## Fluxograma do projeto

![fluxograma v2](https://raw.githubusercontent.com/PedroCF87/suprema-test/main/docs/fluxograma_v2.png)

[Clique aqui](https://raw.githubusercontent.com/PedroCF87/suprema-test/main/docs/fluxograma_v2.png) para acessar a imagem do fluxograma.

No primeiro momento o usuário apenas visualiza a tela de login e o frontend inicia a conexão via Websocket com o backend. O backend verifica se a origem da conexão está autorizada a acessar aos recursos e caso não seja, já encerra a conexão com uma mensagem de erro.

O usuário preenche as credenciais e clica no botão enviar. Neste momento a autenticação dos métodos privados é realizada.

O frontend envia um Token JWT para o backend.

### Exemplo

#### Token JWT

> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiVUlEIjoiMDEwMjAzMzA0MDUiLCJpYXQiOjE3MjUyMzkwMjJ9.N0sYskeWrhLIeB5L6wbAsbqz8vJ7GTP-x7uNCL8bOEs

```json
{
  "sub": "1234567890",
  "UID": "01020330405",
  "iat": 1725239022
}
```

Obs.: É possível criar um novo token no site [jwt.io](https://jwt.io/). É preciso preencher o campo "your-256-bit-secret" com o valor da variável de ambiente chamada "JWT_SECRET" e o payload com um objeto no padrão abaixo:

```json
{
  "sub": "1234567890",
  "UID": "01020330405",
  "iat": 1725239022
}
```

Obs.: O campo "iat" é um timestamp com a data de validade do token.

A autenticação acontecendo com sucesso, os dados do usuário (login e senha) são processados via RPC pela função de login do backend. Caso os dados estejam corretos o usuário é autenticado.

## Como executar o projeto

O primeiro passo é compor os arquivos de variáveis de ambiente.

Se for executar os dois serviços de uma só vez, a partir da pasta raiz do repositório, preencha os arquivos ".env" da pasta raiz do repositório (usando o arquivo ".env.example" como base) e o arquivo da pasta do frontend também.

Caso pretenda executar cada um dos serviços separadamente (backend / frontend), preencha os arquivos ".env" da pasta de cada um dos serviços (usando o arquivo ".env.example" como base).

As credenciais de testes serão enviadas por meio do Whatsapp, para manter a segurança do projeto.

A validação das credenciais acontece no backend e foi implementada de uma forma que torna impossível a descoberta das credenciais por meio de engenharia reversa.

Para executar o projeto é preciso instalar as dependências, usando o comando abaixo (execute ele na pasta raiz do repositório, na mesma pasta deste arquivo):

```bash
npm run install
```

Após finalizar a instalação das dependências dos projetos de backend e frontend, é possível executar os dois projetos de uma só vez, em modo de desenvolvimento, usando o comando abaixo (na mesma pasta deste arquivo):

```bash
npm run dev
```

Você deverá visualizar no console:

```bash
> suprema-poker-test@1.0.0 dev
> concurrently "node backend/src/server.js" "cd frontend && npm run dev"

[0] >> Servidor de backend em execução.
[1] 
[1] > poker-frontend@1.0.0 dev
[1] > next dev
[1] 
[1]   ▲ Next.js 14.2.6
[1]   - Local:        http://localhost:3000
[1] 
[1]  ✓ Starting...
[1]  ✓ Ready in 1194ms

```

### Acesse no seu navegador

> [http://localhost:3000](http://localhost:3000)


Ou caso queira executar a versão de produção:

```bash
npm run start
```
