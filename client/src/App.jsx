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
import { Group } from "./pages/Group"
import { GroupInfo } from "./pages/GroupInfo"
import { GroupCreatePage } from "./pages/GroupCreate"
import { ErrorPage } from "./pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConversationsList />,
  },
  {
    path: '/groups',
    element: <GroupsList />,
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
  },
  {
    exactPath: '/group/create',
    element: <GroupCreatePage />,
  },
  {
    path: '/group/:id',
    element: <Group />
  },
  {
    path: '/group/:id/details',
    element: <GroupInfo />
  },
])



export const App = () => {
  return (
    <RouterProvider router={router} />  
  )
}