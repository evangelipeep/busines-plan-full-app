import { Outlet } from 'react-router-dom'
import { Header } from './header/Header'
import { Footer } from './footer/Footer'

export const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grow bg-gray-50">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
