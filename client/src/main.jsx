import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './App.css'
import { Homepage } from './pages/Homepage.jsx'
import { SignupPage } from './pages/Signup.jsx'
import Header from './components/Header'
import { LoginPage } from './pages/Login'
import { UserProfile } from './pages/UserProfile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/login',
    element: <LoginPage />,
  },  
  {
    path: '/user/:id',
    element: <UserProfile />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
