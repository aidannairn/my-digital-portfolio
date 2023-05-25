import { forwardRef, useContext, useEffect, useRef, useState } from 'react'

import { AlertsContext } from '../contexts/AlertsContext'
import FlashAlertCard from './FlashAlertCard'
import useWindowSize from '../utils/useWindowSize'

const FlashAlerts = forwardRef(( { alerts: alertList }, ref ) => {
  const { removeOldestAlert } = useContext(AlertsContext)
  const flashRef = useRef(null)
  const windowWidth = useWindowSize('x')
  const [paddingRight, setPaddingRight] = useState(0)
  const [flashStyles, setFlashStyles] = useState({})
  const [alignment, setAlignment] = useState('flex-end')
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    setAlerts([...alertList].slice(0, 5))
  }, [alertList])

  useEffect(() => {
    const interval = setInterval(() => {
      if (alertList.length && alerts.length) {
        removeOldestAlert()
      }
    }, (alerts[0]?.duration || 7.5) * 1000)
    
    return () => clearInterval(interval);
}, [alertList, alerts])

  /*  Center FlashAlerts on the page.
      - Because the application is inside a fixed window (due to animation limitations) - Other elements that have a fixed position will appear slightly off center due to the scrollbar width.
      - This is resolved by first referencing a sibling element of FlashAlerts and subtracting its width from the width of FlashAlerts.
      - Set the result as "paddingRight" for FlashAlerts styles.
  */
  useEffect(() => {
    if (ref.current && flashRef.current) {
      const appWidth = ref.current.clientWidth
      const flashWidth = flashRef.current.clientWidth
      const scrollbarPadding = flashWidth >= appWidth
        ? flashWidth - appWidth
        : 0
      setPaddingRight(scrollbarPadding)
    }
  }, [windowWidth])

  useEffect(() => {
    if (windowWidth <= 640) getFlashStyles()
    else getFlashStyles(alignment)
  }, [windowWidth, paddingRight, alignment])
  
  const getFlashStyles = (alignment = 'center') => {
    const styles = {
      alignItems: 'center',
      visibility: 'visible',
      paddingRight
    }

    styles.alignItems = alignment
    if (alignment !== 'center') {
      if (windowWidth >= 640 && windowWidth <= 1280) {
        styles.paddingRight = paddingRight + 20
      } else if (windowWidth > 1280) {
        styles.paddingRight = 0
      } else {
        styles.paddingRight = paddingRight
      }
    }
    setFlashStyles(styles)
  }
  
  return (
    <div ref={flashRef} className='fixed w-full top-16 z-50'>
      <div className='flash-alerts w-full delay-1000 invisible max-w-7xl relative left-[50%] translate-x-[-50%] flex flex-col' style={flashStyles}>
        { alerts.map((alert, i) => {
          return (
            <FlashAlertCard key={i} alert={alert} />
          )
        })
        }
      </div>
    </div>
  )
})

export default FlashAlerts