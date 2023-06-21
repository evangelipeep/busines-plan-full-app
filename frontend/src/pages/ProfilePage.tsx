import { Link } from 'react-router-dom'
import { Button } from '../components/button/Button'

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Страница профиля</h1>
      <p className="text-center mb-8">
        Эта анкета даёт возможность объективно проанализировать ваше обращение к
        нашей компании.
      </p>
      <Link to="/calculator" className="mb-4 text-blue-500 underline">
        <Button isFilled={true} children="Перейти к анкете" />
      </Link>
      <a href="https://busines-plan-full-app-frontend.vercel.app/">
        <button className="py-2 px-4 rounded-lg shadow-lg bg-red-500 text-white mb-4">
          Выйти из аккаунта
        </button>
      </a>
    </div>
  )
}

export default Profile
