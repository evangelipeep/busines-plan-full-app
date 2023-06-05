import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { СalculatorPage } from './pages/СalculatorPage'
import { СontactsPage } from './pages/СontactsPage'
import { NotfoundPage } from './pages/NotfoundPage'
import ProfilePage from './pages/ProfilePage'

import { Forgot } from './components/auth/forgot/Forgot'
import { PrivatRoute } from './components/utils/router/PrivatRoute'
import { AuthRootComponent } from './components/auth'

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PrivatRoute />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="calculator" element={<СalculatorPage />} />
            </Route>
            <Route index element={<HomePage />} />
            <Route path="contacts" element={<СontactsPage />} />

            <Route path="login" element={<AuthRootComponent />} />
            <Route path="register" element={<AuthRootComponent />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="*" element={<NotfoundPage />} />
          </Route>
        </Routes>
      </>
    </div>
  )
}

export default App
