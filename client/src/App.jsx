import { useContext, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { AlertsContext } from './contexts/AlertsContext'
import FlashAlerts from './components/FlashAlerts'
import useWindowSize from './utils/useWindowSize'

const App = () => {
  const { alerts } = useContext(AlertsContext)
  const appRef = useRef(null)
  const widthRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    document.documentElement.style.setProperty('--vw-exclude-scrollbar', widthRef?.current?.clientWidth + 'px')
  }, [useWindowSize()])

  const handleQuickScrollClick = () => {
    const { scrollLeft, scrollTop } = appRef.current

    if (scrollTop < 80) {
      appRef.current.scrollTo({
        left: scrollPosition.x,
        top: scrollPosition.y,
        bahavior: 'smooth'
      })
      setScrollPosition({
        x: 0,
        y: 0
      })
    } else {
      setScrollPosition({
        x: scrollLeft,
        y: scrollTop
      })
      appRef.current.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
    }
  }  
  
  return (
    <div ref={appRef} className='app'>
      <div
        className='fixed top-0 left-0 w-dynamic-screen h-4 z-50'
        onClick={handleQuickScrollClick}
      />
      <div ref={widthRef} className='w-full'></div>
      { !!alerts?.length &&
        <FlashAlerts ref={widthRef} alerts={alerts} />
      }
      <Outlet />
    </div>
  )
}

export default App
