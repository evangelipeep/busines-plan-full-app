import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, Variants } from 'framer-motion'
import { Button } from '../button/Button'
import { ReactComponent as Logo } from '../../assets/svg/logo-nav.svg'
import { ReactComponent as IconOpenMenu } from '../../assets/svg/icon-open-menu.svg'
import { ReactComponent as IconCloseMenu } from '../../assets/svg/icon-close-menu.svg'

export const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const menuOpenStyle = 'hidden md:flex'
  const menuCloseStyle = 'flex'
  const howerWhite = 'hover:text-white '

  const pVariants: Variants = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 100,
      transition: {
        delay: 0.5,
        duration: 0.9,
      },
    },
  }
  const bVariants: Variants = {
    hidden: { scale: 1.2 },
    visible: {
      scale: 0.9,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17,
      },
    },
  }

  return (
    <>
      <header className="bg-my-green absolute w-screen">
        <nav className="flex justify-between items-center w-[90%] mx-auto py-2">
          <NavLink to="/">
            <motion.div initial="hidden" animate="visible" variants={pVariants}>
              <Logo className="h-5 w-[160px] md:h-8 xl:h-10" />
            </motion.div>
          </NavLink>
          <div className={`${mobileNavOpen ? menuCloseStyle : menuOpenStyle}`}>
            <ul className="absolute md:static w-full flex flex-col md:flex-row md:items-center gap-8 md:gap-[4vw] bg-my-green shadow-2xl md:shadow-none left-0 top-[55px] text-center py-7">
              <motion.li
                className={`${howerWhite}`}
                whileHover="hidden"
                whileTap="visible"
                variants={bVariants}
              >
                <NavLink to="/">Главная</NavLink>
              </motion.li>
              <motion.li
                className={`${howerWhite}`}
                whileHover="hidden"
                whileTap="visible"
                variants={bVariants}
              >
                <NavLink to="/calculator">Анкета</NavLink>
              </motion.li>
              <motion.li
                className={`${howerWhite}`}
                whileHover="hidden"
                whileTap="visible"
                variants={bVariants}
              >
                <NavLink to="/contacts">Контакты</NavLink>
              </motion.li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <NavLink to="/profile">
              <Button hasBorder={true} children="Профиль"></Button>
            </NavLink>
            <div
              className="md:hidden ml-auto cursor-pointer z-30"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? <IconCloseMenu /> : <IconOpenMenu />}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
