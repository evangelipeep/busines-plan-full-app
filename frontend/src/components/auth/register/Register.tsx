import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Typography, Button } from '@mui/material'
import { IPropsRegister } from '../../../common/types'

export const Register: React.FC<IPropsRegister> = (
  props: IPropsRegister
): JSX.Element => {
  const { register, errors } = props
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
        helperText={errors.email ? `${errors.email.message}` : ''}
        {...register('email', {
          required: 'Это обязательное поле вообще-то',
          pattern:
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
        })}
        error={!!errors.email}
      />
      <TextField
        fullWidth={true}
        margin="normal"
        label="Логин"
        variant="outlined"
        placeholder="Введите логин.."
        helperText={errors.login ? `${errors.login.message}` : ''}
        {...register('login', {
          required: 'Это обязательное поле вообще-то',
        })}
        error={!!errors.login}
      />
      <TextField
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
        error={!!errors.password}
      />
      <TextField
        type="password"
        fullWidth={true}
        margin="normal"
        label="Password"
        variant="outlined"
        placeholder="Повторите пароль..."
        helperText={errors.password ? `${errors.password.message}` : ''}
        {...register('password', {
          required: 'Это обязательное поле вообще-то',
          minLength: 8,
        })}
        error={!!errors.password}
      />

      <Button
        href="https://test-bpa.vercel.app/profile"
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
