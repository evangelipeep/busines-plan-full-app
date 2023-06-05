import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Typography, Button } from '@mui/material'

export const Login = () => {
  return (
    <div>
      <Typography variant="h4" padding={3} textAlign="center">
        Авторизация
      </Typography>
      <Typography variant="body1" textAlign="center">
        Введите свой логин и пароль
      </Typography>
      <TextField
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введите свою почту..."
      />
      <TextField
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введите пароль..."
      />
      <Button
        variant="contained"
        sx={{ marginTop: 2, marginBottom: 2, width: '100%' }}
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
    </div>
  )
}
