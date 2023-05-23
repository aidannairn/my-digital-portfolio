import { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

const defaultAlerts = {
  alerts: [],
  addAlert: () => {},
  removeAlertById: () => {},
  removeOldestAlert: () => {}
}

const AlertsContext = createContext(defaultAlerts)

if (AlertsContext === undefined)
  throw new Error('No AlertsContext provider')

const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([])

  const addAlert = alert => {
    const id = uuid()
    setAlerts(prevAlerts => [...prevAlerts, { id, ...alert }])
    return id
  }

  const removeAlertById = id => {
    setAlerts(prevAlerts => 
      prevAlerts.filter(alert =>
        alert.id !== id
      )
    )
  }  
  
  const removeOldestAlert = () =>
    setAlerts(prevAlerts => prevAlerts.slice(1))

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, removeAlertById, removeOldestAlert }}>
      { children }
    </AlertsContext.Provider>
  )
}

export { AlertsContext, AlertsProvider }