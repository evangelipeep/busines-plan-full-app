import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Login } from './login/Login'
import { Register } from './register/Register'
import { Box } from '@mui/material'

import { instance } from '../utils/axios'

export const AuthRootComponent = () => {
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (location.pathname === '/login') {
      const userData = {
        login,
        email,
        password,
      }
      const user = await instance.post('auth/sing-in', userData)
      console.log(user.data)
    } else {
      const userData = {
        login,
        email,
        password,
      }
      const newUser = await instance.post('auth/sing-up', userData)
      console.log(newUser)
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          maxWidth={640}
          margin="20vh auto"
          padding={5}
          borderRadius={5}
          boxShadow="5px 5px 10px #ccc"
        >
          {location.pathname === '/login' ? (
            <Login login={setLogin} email={setEmail} password={setPassword} />
          ) : location.pathname === '/register' ? (
            <Register
              login={setLogin}
              email={setEmail}
              password={setPassword}
            />
          ) : null}
        </Box>
      </form>
    </div>
  )
}
