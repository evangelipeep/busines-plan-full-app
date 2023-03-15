import { ReactComponent as Telephone } from '../../assets/svg/telephone.svg'
import { ReactComponent as Email } from '../../assets/svg/email.svg'
import { ReactComponent as Vk } from '../../assets/svg/vk.svg'
import { ReactComponent as Telegram } from '../../assets/svg/telegram.svg'

export const Contacts = () => {
  const styleEl = 'flex items-center flex-col gap-5 m-5'

  return (
    <>
      <section className="text-center mx-auto mt-[20vh]">
        <h1 className="text-xl font-bold pb-20">Контакты</h1>
        <ul className="grid grid-cols-2 xl:grid-cols-4">
          <li className={styleEl}>
            <Telephone />
            <span className="font-bold">Яна</span>
            <a className="opacity-100 hover:opacity-50" href="tel:+79627118585">
              +7 (962) 711-85-85
            </a>

            <span className="font-bold">Алиса</span>
            <a className="opacity-100 hover:opacity-50" href="tel:+79673118585">
              +7 (967) 311-85-85
            </a>
            <span>с 10.00 до 22.00 без выходных</span>
          </li>
          <li className={styleEl}>
            <Email />
            <span className="font-bold">Почта</span>
            <a
              className="opacity-100 hover:opacity-50"
              href="mailto:business.contract2022@gmail.com"
            >
              business.contract2022 @gmail.com
            </a>

            <a
              className="opacity-100 hover:opacity-50"
              href="mailto:rustaveli812@yandex.ru"
            >
              rustaveli812 @yandex.ru
            </a>
          </li>
          <li className={styleEl}>
            <Vk />
            <a
              className="opacity-100 hover:opacity-50 font-bold"
              href="https://vk.com/bus_plane_rus"
            >
              Группа ВК
            </a>
          </li>
          <li className={styleEl}>
            <Telegram />
            <a
              className="opacity-100 hover:opacity-50 font-bold"
              href="https://t.me/biznesplansockontrakt"
            >
              Телеграмм
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}
