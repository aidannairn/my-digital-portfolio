import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import { UserProvider } from './contexts/UserContext'
import { ErrorBoundary } from './components'
import './index.css'

axios.defaults.withCredentials = true

const router = createBrowserRouter([
  {
    element: 
      <UserProvider>
        <App />,
      </UserProvider>,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signin',
        element: <SignIn />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
