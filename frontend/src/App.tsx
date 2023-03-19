import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { СalculatorPage } from './pages/СalculatorPage'
import { СontactsPage } from './pages/СontactsPage'
import { ProfilePage } from './pages/ProfilePage'
import { NotfoundPage } from './pages/NotfoundPage'
import { Register } from './components/auth/register/Register'
import { Login } from './components/auth/login/Login'
import { Forgot } from './components/auth/forgot/Forgot'

function App() {
  return (
    <div className='App'>
      <>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='calculator' element={<СalculatorPage />} />
            <Route path='contacts' element={<СontactsPage />} />
            <Route path='profile/*' element={<ProfilePage />} />
              <Route index element={<Login/>}/> 
              <Route path='register' element={<Register/>}/>
              <Route path='forgot' element={<Forgot/>}/>
            <Route path='*' element={<NotfoundPage />} />
          </Route>
        </Routes>
      </>
    </div>
  )
}

export default App
