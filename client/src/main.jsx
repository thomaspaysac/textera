import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './App.css'
import {Homepage} from './pages/Homepage.jsx'
import { Signup } from './pages/Signup.jsx'
import { UserProfile } from './pages/UserProfile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/signup',
    element: <Signup />
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
