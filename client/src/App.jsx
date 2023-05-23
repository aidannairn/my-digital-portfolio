import { useContext, useRef } from 'react'
import { Outlet } from 'react-router-dom'

import { AlertsContext } from './contexts/AlertsContext'
import FlashAlerts from './components/FlashAlerts'

const App = () => {
  const { alerts } = useContext(AlertsContext)
  const widthRef = useRef(null)
  
  return (
    <div className='app'>
      <div ref={widthRef} className='w-full'></div>
      { !!alerts?.length &&
        <FlashAlerts ref={widthRef} alerts={alerts} />
      }
      <Outlet />
    </div>
  )
}


export default App
