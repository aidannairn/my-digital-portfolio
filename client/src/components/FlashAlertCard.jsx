import { useContext, useRef } from 'react'

import { AlertsContext } from '../contexts/AlertsContext'
import styles from '../styles'

const FlashAlertCard = ({ alert: { id, type, msg, component: Component }}) => {
  const { removeAlertById } = useContext(AlertsContext)
  const alertItemRef = useRef(null)

  const allowedTypes = ['info', 'success', 'warning', 'error']

  const alertSubClass = 
    allowedTypes.includes(type.toLowerCase())
      ? `alert${type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase()}`
      : 'alertInfo'
  
  return (
    <div 
      ref={alertItemRef}
      id={`${id}`}
      className={`rounded-sm mb-2 py-1 px-2 max-w-[90%] sm:max-w-[27rem] shadow-alert flex justify-between gap-2 ${styles[alertSubClass]}`}
    >
      <div>
        { Component && <Component /> }
        { Component && msg && <br/> }
        { msg && <p>{msg}</p> }
      </div>
      <i className='fa fa-times-circle h-fit mt-1 cursor-pointer hover:opacity-75' aria-hidden='true' onClick={() => removeAlertById(id)}></i>
    </div>
  )
}

export default FlashAlertCard