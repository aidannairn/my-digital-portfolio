import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { slideIn } from '../utils/motion'
import { styles } from '../styles'
import { logo, menu, close } from '../assets'
import { UserContext } from '../contexts/UserContext'

const Navbar = ({ isLoading }) => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  const { user: { userId }, userSignOut } = useContext(UserContext)

  const navLinks = [
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' }
  ]

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full h-20 flex items-center py-5 top-0 absolute z-20 bg-primary`}
      >
        <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
          <Link
            to='/'
            className='flex items-center gap-2'
            onClick={() => {
              setActive('')
              window.scrollTo(0, 0)
            }}
          >
            <img src={logo} alt='Logo' className='w-9 h-9 object-contain' />
            <p className='text-white text=[18px] font-bold curson-pointer flex'>
              Aidan Nairn&nbsp;
              <span className='sm:block hidden border-l-[2.5px] pl-2 ml-[0.25rem]'>Full Stack Developer</span>
            </p>
          </Link>
          <ul className='list-none hidden sm:flex flex-row gap-10'>
            { !isLoading && navLinks.map(link => (
              <li
                key={link.id}
                className={`
                  ${active === link.title ? 'text-white' : 'text-secondary'}
                  hover:text-white text-[18px] font-medium cursor-pointer
                `}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
            { userId &&
              <li
                className='text-secondary hover:text-white text-[18px] font-medium cursor-pointer'
                onClick={userSignOut}
              >
                Logout
              </li>
            }
          </ul>
          <div className='sm:hidden flex flex-1 justify-end items-center'>
            <img 
              src={toggle ? close : menu}
              alt='Menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
      </nav>
      <motion.div
        className={`${!toggle ? 'hidden' : 'flex'} p-6 bg-primary absolute top-[75px] z-10 right-0 w-full z-10`}
        initial='hidden'
        whileInView='visible'
        variants={slideIn('down', 'tween', 0, 0.25)}
      >
        <ul className='list-none flex justify-end items-start flex-col gap-4'>
          {navLinks.map(link => (
            <li
              key={link.id}
              className={`
                ${active === link.title ? 'text-white' : 'text-secondary'}
                font-poppins font-medium curson-pointer text-[16px]
              `}
              onClick={() => {
                setToggle(!toggle)
                // setActive(link.title)
              }}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          { userId &&
            <li
              className='text-secondary hover:text-white text-[16px] font-medium cursor-pointer'
              onClick={userSignOut}
            >
              Logout
            </li>
          }
        </ul>
      </motion.div>
    </>
  )
}

export default Navbar