import React from 'react'
import { useLocation } from 'react-router-dom'
import { Login } from './login/Login'
import { Register } from './register/Register'

export const AuthRootComponent = () => {
  const location = useLocation()
  return location.pathname === '/login' ? (
    <Login />
  ) : location.pathname === '/register' ? (
    <Register />
  ) : null
}
