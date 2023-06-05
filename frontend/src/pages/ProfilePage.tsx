import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Login } from '../components/auth/login/Login'
import { Register } from '../components/auth/register/Register'
import { Forgot } from '../components/auth/forgot/Forgot'
import { Button } from '../components/button/Button'

const ProfilePage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-hsl(76, 37%, 68%)">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center">
          <div className="rounded-full w-16 h-16 bg-gray-300"></div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">Имя Пользователя</h2>
            <div className="flex items-center mt-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <p className="text-sm ml-1">Принято</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p>Анкета еще не отправлена</p>
          <Link
            to="/calculator"
            className="text-my-green-2 hover:text-black transition underline"
          >
            Ссылка на анкету
          </Link>
        </div>
        <div className="mt-4">
          <textarea
            className="w-full h-20 p-2 border border-gray-300 rounded"
            placeholder="Напишите свой пост..."
          ></textarea>
          <div className="flex items-center mt-2">
            <input type="file" className="mr-2" />
            <button type="submit">
              <Button isFilled={true} children="Отправить" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
