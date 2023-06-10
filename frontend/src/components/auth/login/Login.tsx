import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Typography, Button } from '@mui/material'
import { IPropsLogin } from '../../../common/types'

export const Login: React.FC<IPropsLogin> = (
  props: IPropsLogin
): JSX.Element => {
  const { setEmail, setPassword, setLogin } = props
  return (
    <>
      <Typography variant="h4" padding={3} textAlign="center">
        Авторизация
      </Typography>
      <Typography variant="body1" textAlign="center">
        Введите свой логин и пароль
      </Typography>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введите свою почту..."
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Логин"
        variant="outlined"
        placeholder="Введите логин.."
        onChange={(e) => setLogin(e.target.value)}
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введите пароль..."
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          marginTop: 2,
          marginBottom: 2,
          width: '100%',
          backgroundColor: 'green',
        }}
      >
        Войти
      </Button>
      <Typography variant="body1" textAlign="center">
        Нет аккаунта?{' '}
        <Link
          to="/register"
          className="text-blue-500 hover:text-black transition "
        >
          Регистрация
        </Link>
      </Typography>
    </>
  )
}
