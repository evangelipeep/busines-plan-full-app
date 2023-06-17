import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Typography, Button } from '@mui/material'
import { IPropsLogin } from '../../../common/types'

export const Login: React.FC<IPropsLogin> = (
  props: IPropsLogin
): JSX.Element => {
  const { register, errors } = props
  return (
    <>
      <Typography variant="h4" padding={3} textAlign="center">
        Авторизация
      </Typography>
      <Typography variant="body1" textAlign="center">
        Введите свой логин и пароль
      </Typography>
      <TextField
        error={!!errors.email}
        fullWidth={true}
        margin="normal"
        label="Email"
        variant="outlined"
        placeholder="Введите свою почту..."
        helperText={errors.email ? `${errors.email.message}` : ''}
        {...register('email', {
          required: 'Это обязательное поле вообще-то',
          pattern:
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
        })}
      />
      <TextField
        error={!!errors.login}
        fullWidth={true}
        margin="normal"
        label="Логин"
        variant="outlined"
        placeholder="Введите логин.."
        helperText={errors.login ? `${errors.login.message}` : ''}
        {...register('login', {
          required: 'Это обязательное поле вообще-то',
        })}
      />
      <TextField
        error={!!errors.password}
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Введите пароль..."
        helperText={errors.password ? `${errors.password.message}` : ''}
        {...register('password', {
          required: 'Это обязательное поле вообще-то',
          minLength: 8,
        })}
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
