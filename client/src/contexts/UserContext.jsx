import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

import { AlertsContext } from './AlertsContext'
import getBaseURL from '../utils/getBaseURL'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const { addAlert } = useContext(AlertsContext)
  const navigate = useNavigate()
  const baseURL = getBaseURL()

  const [user, setUser] = useState({
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    imageURL: '',
    tokenExpiry: '',
    userToken: ''
  })
  const [userSignedOut, setUserSignedOut] = useState(false)

  useEffect(() => {
    if (userSignedOut) {
      addAlert({
        type: 'success',
        msg: 'You have been signed out.',
        duration: 3
      })
      const timeout = setTimeout(() => {
        navigate('/', { replace: true })
        navigate(0)
      }, 3500)

      return () => clearTimeout(timeout)
    }
  }, [userSignedOut])
  
  const getRefreshToken = async () => {
    try {
      const res = await axios.get(`${baseURL}/token`)

      // If no user is currently signed in - Log the response message and exit the function.
      if (res.data.msg) return console.log(res.data.msg)

      const resDecoded = await decode(res.data.accessToken)
      const { userId, email, firstName, lastName, imageURL, exp: tokenExpiry } = resDecoded
      setUser({ userId, email, firstName, lastName, imageURL, tokenExpiry, userToken: res.data.accessToken })
      console.log(`${firstName} is signed in.`)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { getRefreshToken() }, [])

  const authRequest = axios.create()

  authRequest.interceptors.request.use(async config => {
    const currentDate = new Date()
    try {
      if (user.tokenExpiry * 1000 < currentDate.getTime()) {
        const res = await axios.get(`${baseURL}/token`)
        config.headers.Authorization = `Bearer ${res.data.accessToken}`
        const resDecoded = await decode(res.data.accessToken)
        const { userId, email, firstName, lastName, imageURL, exp: tokenExpiry } = resDecoded
        setUser({ userId, email, firstName, lastName, imageURL, tokenExpiry, userToken: res.data.accessToken })
      }
      return config
    } catch (error) {
      return Promise.reject(error)
    }
  })

  const userSignOut = async () => {
    try {
      await axios.delete(`${baseURL}/signout`)
      setUserSignedOut(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UserContext.Provider value={{ user, userSignOut, authRequest }}>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }