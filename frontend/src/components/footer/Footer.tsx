import { ReactComponent as GitHub } from '../../assets/svg/github.svg'

export const Footer = () => {
  return (
    <footer className='bg-my-green-2  h-[60px] flex items-center justify-center'>
      <span className='text-sm font-bold'>
        © 2023
      </span>
      <a href='https://github.com/AnastasiiaFalcon' className='hover:underline'>
        <GitHub
        
        className='opacity-100 hover:opacity-80'/>
      </a>
    </footer>
  )
}
