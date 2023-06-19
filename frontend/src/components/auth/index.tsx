import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Login } from './login/Login'
import { Register } from './register/Register'
import { Box } from '@mui/material'

import { instance } from '../../utils/axios'
import { useAppDispatch } from '../../utils/hook'
import { iLogin } from '../../store/slice/auth'
import { useForm } from 'react-hook-form'

export const AuthRootComponent: React.FC = (): JSX.Element => {
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const handleSubmitForm = async (data: any) => {
    if (location.pathname === '/login') {
      try {
        const userData = {
          login: data.login,
          email: data.email,
          password: data.password,
        }
        const user = await instance.post('auth/sing-in', userData)
        await dispatch(iLogin(user.data))
        navigate('/calculator')
      } catch (e) {
        return e
      }
    } else {
      try {
        const userData = {
          login,
          email,
          password,
        }
        const newUser = await instance.post('auth/sing-up', userData)
        await dispatch(iLogin(newUser.data))
        navigate('/')
      } catch (e) {
        return e
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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
            <Login register={register} errors={errors} />
          ) : location.pathname === '/register' ? (
            <Register register={register} errors={errors} />
          ) : null}
        </Box>
      </form>
    </div>
  )
}
