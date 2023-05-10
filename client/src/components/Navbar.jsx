import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../contexts/UserContext'
import logo from '../assets/logo.png'
import useWindowSize from '../utils/useWindowSize'
import styles from '../styles'

const Navbar = ({ isLoading }) => {
  const { user: { userId }, userSignOut } = useContext(UserContext)
  const isHamburgerMenu = useWindowSize('x') < 885 ? true : false
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)

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
            onClick={() => { window.scrollTo(0, 0) }}
          >
            <img src={logo} alt='Logo' className='w-9 h-9 object-contain' />
            <div className='flex whitespace-nowrap text-white text=[18px] font-bold curson-pointer'>
              <p>Aidan Nairn</p>
              <p className='hidden sm:block border-l-[2.5px] pl-2 ml-2'>Full Stack Developer</p>
            </div>
          </Link>
          { isHamburgerMenu &&
            <div className='flex flex-1 justify-end items-center mb-2'>
              <div className={`${isHamburgerOpen ? 'active' : ''} hamburger`}
                onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              >
                <div className='top-bun'></div>
                <div className='meat'></div>
                <div className='bottom-bun'></div>
              </div>
            </div>
          }
          <div className={isHamburgerMenu ? `${isHamburgerOpen ? 'flex' : 'hidden'} p-6 bg-primary absolute top-20 right-0 w-full` : ''}>
            <ul className={`list-none flex justify-center items-center text-secondary ${isHamburgerMenu ? 'flex-col gap-3 w-full text-[1.5em] font-extralight' : 'h-10 top-5 flex-row gap-10'}`}>
              { !isLoading && navLinks.map(link => (
                <li
                  key={link.id}
                  className='hover:text-white curson-pointer'
                  onClick={() => { setIsHamburgerOpen(!isHamburgerOpen) }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              { userId &&
                <li
                  className='hover:text-white cursor-pointer'
                  onClick={userSignOut}
                >
                  Logout
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar