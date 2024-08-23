import { Fragment, useState } from 'react'
import {
  CssBaseline,
  Container,
  Button,
  Snackbar
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Head from "next/head"
import Image from "next/image"
import { LoginBox, LoginTextField } from '@/components'

const WebSocket = require('rpc-websockets').Client
const ws = new WebSocket('ws://localhost:8080')

const projectName = 'Suprema Poker'
const pageTitle = 'Backend test'

export default function Home() {
  const [loggedUser, setLoggedUser] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleClose = () => {
    setShowAlert(false)
  }

  const handleUsernameChange = async event => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = async event => {
    setPassword(event.target.value)
  }

  const connectUser = () => {
    if (!username || username === '') {
      setMessage('Usuário não preenchido')
      setShowAlert(true)
      document.getElementById('user').focus()
      return
    }

    if (!password || password === '') {
      setMessage('Senha não preenchida')
      setShowAlert(true)
      document.getElementById('password').focus()
      return
    }

    const userData = { username, password }

    ws.call('login', userData).then(function({ success = false }) {

      if (success) {
        setMessage('Login realizado com sucesso')
        setShowAlert(true)

        setLoggedUser(true)
        return
      }

      setMessage('Usuário e/ou senha inválidos')
      setShowAlert(true)
  
    }).catch(e => {
      // finalizando a conexão websocket
      ws.close()
    })
  }

  return (
    <Fragment>
      <Head>
        <title>{`${projectName} - ${pageTitle}`}</title>
        <meta name="description" content={pageTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1 style={{ marginTop: '64px' }}>
          {pageTitle}
        </h1>
        <LoginBox>
          <Image src='/logoSuprema.png' alt='logo Suprema' width={170} height={26} />


          {loggedUser
            ? <h2 style={{ marginTop: '32px' }}>
                <CheckCircleIcon color="success" sx={{ mr: 2 }} />
                Usuário conectado
              </h2>
            : <div>
              <LoginTextField
                id="user"
                label="Usuário"
                variant="filled"
                fullWidth
                onChange={handleUsernameChange}
              />

              <LoginTextField
                id="password"
                label="Senha"
                variant="filled"
                type='password'
                fullWidth
                onChange={handlePasswordChange}
              />

              <Button variant="contained" size='large' fullWidth sx={{ mt: 2 }} onClick={connectUser}>
                Enviar
              </Button>            
            </div>
          }

        </LoginBox>

        <Snackbar
          open={showAlert}
          autoHideDuration={10000}
          onClose={handleClose}
          message={message}
        />

      </Container>
    </Fragment>
  );
}
