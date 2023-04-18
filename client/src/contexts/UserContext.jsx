import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    imageURL: '',
    tokenExpiry: ''
  })

  const getRefreshToken = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/token`)

      // If no user is currently signed in - Log the response message and exit the function.
      if (res.data.msg) return console.log(res.data.msg)

      const resDecoded = await decode(res.data.accessToken)
      const { id, email, firstName, lastName, imageURL, exp: tokenExpiry } = resDecoded
      setUser({ id, email, firstName, lastName, imageURL, tokenExpiry })
      console.log(`${firstName} is signed in.`)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { getRefreshToken() }, [])

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async config => {
    const currentDate = new Date()
    try {
      if (user.tokenExpiry * 1000 < currentDate.getTime()) {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/token`)
        config.headers.Authorization = `Bearer ${res.data.accessToken}`
        const resDecoded = await decode(res.data.accessToken)
        const { id, email, firstName, lastName, imageURL, exp: tokenExpiry } = resDecoded
        setUser({ id, email, firstName, lastName, imageURL, tokenExpiry })
      }
      return config
    } catch (error) {
      return Promise.reject(error)
    }
  })

  const userSignOut = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/api/signout`)
      navigate('/', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UserContext.Provider value={{ user, userSignOut }}>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }