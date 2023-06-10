import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Typography, Button } from '@mui/material'

export const Register = (props: any) => {
  const { setEmail, setPassword, setLogin } = props
  return (
    <div>
      <Typography variant="h4" padding={3} textAlign="center">
        Регистрация
      </Typography>
      <Typography variant="body1" textAlign="center">
        Введите данные для регистрации
      </Typography>

      <TextField
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введите свою почту..."
        onChange={(e) => setEmail(e.target.value)}
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
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введите пароль..."
        onChange={(e) => setPassword(e.target.value)}
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
        Регистрация
      </Button>
      <Typography variant="body1" textAlign="center">
        Уже есть
        <Link
          to="/login"
          className="text-blue-500 hover:text-black transition ml-1"
        >
          аккаунт
        </Link>{' '}
        ?
      </Typography>
    </div>
  )
}
