import React from 'react'
import { useLocation } from 'react-router-dom'
import { Login } from './login/Login'
import { Register } from './register/Register'
import { Box } from '@mui/material'

export const AuthRootComponent = () => {
  const location = useLocation()
  return (
    <div>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          maxWidth={640}
          margin="auto"
          padding={5}
          borderRadius={5}
          boxShadow="5px 5px 10px #ccc"
        >
          {location.pathname === '/login' ? (
            <Login />
          ) : location.pathname === '/register' ? (
            <Register />
          ) : null}
        </Box>
      </div>
    </div>
  )
}
