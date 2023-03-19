import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Login } from '../components/auth/login/Login'
import { Register } from '../components/auth/register/Register'
import { Forgot } from '../components/auth/forgot/Forgot'


export const ProfilePage = () => {
  return (
    <>
      <Routes>
        <Route index element={<Login/>}/> 
        <Route path='register' element={<Register/>}/>
        <Route path='forgot' element={<Forgot/>}/>
      </Routes>
    </>
  )
}
