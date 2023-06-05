import React, { useState } from 'react'
import { Button } from '../../button/Button'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('Логин не может быть пустым')
  const [passwordError, setPasswordError] = useState(
    'Пароль не может быть пустым'
  )

  const blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(event.target.value).toLowerCase())) {
      setEmailError('Некорректный email')
    } else {
      setEmailError('')
    }
  }

  return (
    <section className=" h-screen mt-[10vh] xl:mt-32">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
        <div className="w-full xl:w-[80vh] bg-white rounded-lg shadow ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Вход
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                {emailDirty && emailError && (
                  <div className="text-red-500">{emailError}</div>
                )}
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Логин
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(event) => emailHandler(event)}
                  value={email}
                  name="email"
                  type={'text'}
                  placeholder="Введите свой email"
                ></input>
              </div>

              <div>
                {passwordDirty && passwordError && (
                  <div className="text-red-500">{passwordError}</div>
                )}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Пароль
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  name="password"
                  type={'password'}
                  placeholder="Введите свой пароль"
                ></input>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Запомнить меня
                    </label>
                  </div>
                </div>
                <Link
                  to="forgot"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-white "
                >
                  Забыли пароль?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Войти
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ещё нет аккаунта?{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Регистрация
                </Link>
              </p>

              <button type="submit">
                <Button isFilled={true} children="Войти" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
