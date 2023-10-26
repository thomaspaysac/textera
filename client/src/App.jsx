import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'

import { Homepage } from "./pages/Homepage"
import { SignupPage } from "./pages/Signup"
import { LoginPage } from "./pages/Login"
import { ConversationsList } from "./pages/ConversationsList"
import { GroupsList } from "./pages/GroupsList"
import { ContactsPage } from "./pages/Contacts"
import { SettingsPage } from "./pages/Settings"
import { UserProfile } from "./pages/UserProfile"
import { Conversation } from "./pages/Conversation"

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConversationsList />
  },
  {
    path: '/groups',
    element: <GroupsList />
  },
  {
    path: '/contacts',
    element: <ContactsPage />
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
  {
    path: '/conv/:id',
    element: <Conversation />
  }
])



export const App = () => {
  return (
    <RouterProvider router={router} />  
  )
}