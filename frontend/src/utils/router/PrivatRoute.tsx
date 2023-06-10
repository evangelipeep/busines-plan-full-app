import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hook'

export const PrivatRoute = () => {
  //токен доступа сюда
  const auth = useAuth()
  return auth ? <Outlet /> : <Navigate to="login" />
}
