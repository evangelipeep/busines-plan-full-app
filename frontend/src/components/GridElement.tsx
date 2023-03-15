export const GridElement = ({ text = '', img = '' }) => {
  return (
    <>
     <li
      className='flex flex-col items-center mx-5 my-5'
    >
       <img className='bg-black rounded-2xl' src={img} alt='image' />
      <span className='xl:w-4/5 font-mono font-extrabold pt-5 text-center'>{text}</span>
    </li> 
    </>
  )
}
