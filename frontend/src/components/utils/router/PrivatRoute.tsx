import { Navigate, Outlet } from 'react-router-dom'

export const PrivatRoute = () => {
  //токен доступа сюда
  const auth = true
  return auth ? <Outlet /> : <Navigate to="login" />
}
