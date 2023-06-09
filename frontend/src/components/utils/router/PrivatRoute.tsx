import { Navigate, Outlet } from 'react-router-dom'

export const PrivatRoute = () => {
  //токен доступа сюда
  const auth = false
  return auth ? <Outlet /> : <Navigate to="login" />
}
