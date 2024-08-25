import { Fragment, useState } from 'react'
import {
  CssBaseline,
  Container,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import Head from "next/head"
import Image from "next/image"
import { LoginBox, LoginTextField } from '@/components'
import { CheckCircle } from '@mui/icons-material'

let loginDebounce

const WebSocket = require('rpc-websockets').Client
const ws = new WebSocket('ws://localhost:8080')

const projectName = 'Suprema Poker'
const pageTitle = 'Backend test'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [loggedUser, setLoggedUser] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [message, setMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('default')
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
    
    setLoading(true)

    if (loginDebounce) clearTimeout(loginDebounce)
    /*
      O Debounce é um mecanismo de proteção contra ataques de usuários mal intencionados.
      Ele evita que o usuário posso disparar vários cliques no mesmo botão, enviando várias requisições ao backend.
    */
    loginDebounce = setTimeout(() => {
      if (!username || username === '') {
        setMessage('Usuário não preenchido')
        setAlertSeverity('error')
        setShowAlert(true)
        document.getElementById('user').focus()
        setLoading(false)
        return
      }
  
      if (!password || password === '') {
        setMessage('Senha não preenchida')
        setAlertSeverity('error')
        setShowAlert(true)
        document.getElementById('password').focus()
        setLoading(false)
        return
      }
  
      const authorization = (process.env.authTokens && process.env.authTokens.length)
        ? JSON.parse(process.env.authTokens)[0]
        : ''
      // Token usado na autenticação do WS entre o frontend e o backend
  
      ws.login({ authorization }).then(function() {
  
        const userData = { username, password }
  
        ws.call('login', userData).then(function({ success = false }) {
          if (success) {
            setLoading(false)
            setMessage('Login realizado com sucesso')
            setAlertSeverity('success')
            setShowAlert(true)
            setLoggedUser(true)
            return
          }
  
          setMessage('Usuário e/ou senha inválidos')
          setAlertSeverity('error')
          setShowAlert(true)
          setLoading(false)
      
        }).catch(e => {
          setLoading(false)
          // finalizando a conexão websocket
          ws.close()
        })
  
      }).catch(function(error) {
        setMessage('Erro ao realizar a autenticação. Entre em contato com o administrador do sistema.')
        setAlertSeverity('warning')
        setShowAlert(true)
        setLoading(false)
      })      
    }, 100)
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

          {loading
            ? <h2 style={{ marginTop: '32px' }}>
                Validando suas credenciais
              </h2>
            : <>
                {loggedUser
                  ? <h2 style={{ marginTop: '32px' }}>
                      <CheckCircle color="success" sx={{ mr: 2 }} />
                      Usuário conectado
                    </h2>
                  : <div>
                    <LoginTextField
                      id="user"
                      label="Usuário"
                      variant="filled"
                      fullWidth
                      onChange={handleUsernameChange}
                      value={username}
                    />

                    <LoginTextField
                      id="password"
                      label="Senha"
                      variant="filled"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      onChange={handlePasswordChange}
                      value={password}
                    />

                    <Button variant="contained" size='large' fullWidth sx={{ mt: 2 }} onClick={connectUser}>
                      Enviar
                    </Button>            
                  </div>
                }
            </>
          }


        </LoginBox>

        <Snackbar
          open={showAlert}
          autoHideDuration={10000}
        >
          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>

      </Container>
    </Fragment>
  );
}
