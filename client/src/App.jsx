import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'

import { Homepage } from "./pages/Homepage"
import { SignupPage } from "./pages/Signup"
import { LoginPage } from "./pages/Login"
import { SettingsPage } from "./pages/Settings"
import { UserProfile } from "./pages/UserProfile"

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
    path: '/settings',
    element: <SettingsPage />
  },
  {
    path: '/user/:id',
    element: <UserProfile />,
  },
])

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}