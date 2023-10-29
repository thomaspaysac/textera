import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Header from "./components/Header"
import { Footer } from "./components/Footer"
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
import { AddContactPage } from "./pages/AddContact";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<ConversationsList/>} />
        <Route path="/groups" element={<GroupsList />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path='/contacts/add' element={<AddContactPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/conv/:id" element={<Conversation />} />
        <Route path="/group/:id" element={<Group />} />
        <Route path="/group/:id/details" element={<GroupInfo />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}