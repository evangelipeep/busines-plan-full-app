import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IForm } from '../../types/form.interface'
import { Button } from '../button/Button'

export const FormСalculator: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>()
  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data)

  return (
    <section>
      <div className="flex flex-col mx-auto my-[15vh] w-3/4 bg-gray-50 p-10 rounded-3xl shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Каков профиль деятельности компании?
            </label>
            <select
              className="rounded-lg w-5/6"
              {...register('q1', { required: true })}
            >
              <option value="Производство">Производство</option>
              <option value="Торговля"> Торговля</option>
              <option value="Выполнение работ / Оказание услуг">
                {' '}
                Выполнение работ / Оказание услуг
              </option>
              <option value=" Строительство"> Строительство</option>
              <option value=" Несколько видов деятельности ">
                {' '}
                Несколько видов деятельности{' '}
              </option>
            </select>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              В каком состоянии у Вас исходные данные для планирования (план
              продаж, перечень необходимого оборудования, план по персоналу,
              расходная часть и т.п.)?
            </label>
            <select
              className="rounded-lg w-5/6"
              {...register('q2', { required: true })}
            >
              <option value="На данный момент таких данных нет, ожидаю их от специалистов по бизнес-планированию">
                На данный момент таких данных нет, ожидаю их от специалистов по
                бизнес-планированию
              </option>
              <option value=" Есть частичная/разрозненная информация">
                {' '}
                Есть частичная/разрозненная информация
              </option>
              <option value=" Часть информации собрана и структурирована, часть отсутствует">
                {' '}
                Часть информации собрана и структурирована, часть отсутствует
              </option>
              <option value="  В основном вся информация есть, нужно только ее объединить и структурировать">
                {' '}
                В основном вся информация есть, нужно только ее объединить и
                структурировать
              </option>
            </select>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Требуется ли расширенная поддержка? (По умолчанию мы осуществляем
              поддержку всех проектов в течение 2 месяцев.)
            </label>
            <select
              className="rounded-lg w-5/6"
              {...register('q3', { required: true })}
            >
              <option value="Не требуется">Не требуется</option>
              <option value=" Требуется в течение 6 месяцев">
                {' '}
                Требуется в течение 6 месяцев
              </option>
              <option value=" Требуется в течение года">
                {' '}
                Требуется в течение года
              </option>
            </select>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Дополнительные услуги:
            </label>
            <div className="flex flex-col bg-gray-100 p-5 rounded-2xl">
              <div className="flex justify-between">
                <label>Полиграфический дизайн бизнес-плана</label>
                <input
                  {...register('q4')}
                  type="radio"
                  value="Полиграфический дизайн бизнес-плана"
                />
              </div>
              <div className="flex justify-between">
                <label>Полиграфический дизайн презентации</label>
                <input
                  {...register('q4')}
                  type="radio"
                  value=" Полиграфический дизайн презентации"
                />
              </div>
              <div className="flex justify-between">
                <label>Сайт проекта (лендинг, визитка)</label>
                <input
                  {...register('q4')}
                  type="radio"
                  value=" Сайт проекта (лендинг, визитка)"
                />
              </div>
              <div className="flex justify-between">
                <label>Не нужно</label>
                <input
                  {...register('q4')}
                  type="radio"
                  value=" Сайт проекта (лендинг, визитка)"
                />
              </div>
            </div>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="text"
              placeholder="ФИО"
              {...register('name', { required: true, maxLength: 80 })}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="text"
              placeholder="Суть проекта"
              {...register('explanation', { required: true, maxLength: 300 })}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="text"
              placeholder="Email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="tel"
              placeholder="Ваш телефон"
              {...register('phone', { required: true, maxLength: 12 })}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="text"
              placeholder="Дополнительная информация"
              {...register('q5', {})}
            />

            <button type="submit">
              <Button isFilled={true} children="Отправить" />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
