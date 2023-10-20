import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'

import { Homepage } from "./pages/Homepage"
import { SignupPage } from "./pages/Signup"
import { LoginPage } from "./pages/Login"
import { MessagesPage } from "./pages/Messages"
import { GroupsPage } from "./pages/Groups"
import { SettingsPage } from "./pages/Settings"
import { UserProfile } from "./pages/UserProfile"


const router = createBrowserRouter([
  {
    path: '/',
    element: <MessagesPage />
  },
  {
    path: '/groups',
    element: <GroupsPage />
  },
  {
    path: '/settings',
    element: <SettingsPage />
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



export const App = () => {
  return (
    <RouterProvider router={router} />  
  )
}