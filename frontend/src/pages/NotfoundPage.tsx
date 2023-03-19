import { Link } from 'react-router-dom'
import {ReactComponent as Cat} from './../assets/svg/404-Error with-a-cute-animal-bro.svg'

export const NotfoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center mx-auto text-center mt-28'>
      <Cat className='h-[50vh]'/>
      Эта страница недоступна. Попробуйте <Link className='underline hover:text-my-green' to='/'>Главная</Link>
    </div>
  )
}
