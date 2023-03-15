import { motion } from 'framer-motion'

const borderStyles =
  'border-2 font-bold border-black hover:border-white hover:text-white rounded-lg'
const filledStyles =
  'bg-my-green rounded-lg font-bold py-4 px-6 mx-0 hover:bg-my-green-2 hover:text-white'

export const Button = ({
  children = '',
  hasBorder = false,
  isFilled = false,
}) => {
  return (
    <motion.button
      className={`text-black px-5 py-2 ${hasBorder && borderStyles} ${
        isFilled && filledStyles
      }`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  )
}
