import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../contexts/UserContext'
import logo from '../assets/logo.png'
import useWindowSize from '../utils/useWindowSize'
import styles from '../styles'

const Navbar = ({ isLoading, includesProjects }) => {
  const { user: { userId }, userSignOut } = useContext(UserContext)
  const isSmallScreen = useWindowSize().width < 860 ? true : false
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [navLinks, setNavLinks] = useState([])

  useEffect(() => {
    const links = [
      { id: 'about', title: 'About' },
      { id: 'contact', title: 'Contact' }
    ]

    const projectLink = { id: 'projects', title: 'Projects' }
    
    if (includesProjects || userId)
      setNavLinks([...links.slice(0, 1), projectLink, ...links.slice(1)])
    else
      setNavLinks(links)
      
  }, [includesProjects])
  
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
            <div className={`flex whitespace-nowrap text-white ${isSmallScreen ? 'font-normal' : ''} font-bold curson-pointer`}>
              <p>Full Stack Developer</p>
              { !isSmallScreen &&
                <p className='hidden sm:block border-l-[2.5px] pl-2 ml-2'>Aidan Nairn</p>
              }
            </div>
          </Link>
          { !isLoading && isSmallScreen &&
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
          <div className={isSmallScreen ? `${isHamburgerOpen ? 'flex' : 'hidden'} p-6 bg-primary absolute top-20 right-0 w-full` : ''}>
            <ul className={`list-none flex justify-center items-center text-secondary ${isSmallScreen ? 'flex-col gap-3 w-full text-[1.5em] font-extralight' : 'h-10 top-5 flex-row gap-10'}`}>
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