import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
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
import { GroupCreatePage } from "./pages/GroupCreate";
import { ChangeAvatarPage } from "./pages/ChangeAvatar"
import { ChangeStatusPage } from "./pages/ChangeStatus"
import { TestAuth } from "./pages/TestAuth";

const supabaseUrl = "https://gliraufnczlivoqbxhzc.supabase.co";
import { supabaseKey } from "./_private";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const userContext = createContext();

//const {userData, error} = await supabase.auth.getSession();


export const Routing = () => {
  const [userData, setUserData] = useState(undefined)

  const fetchUserData = async () => {
    console.log('fetching')
    const {data, error} = await supabase.auth.getSession();
    if (!data.session) {
      setUserData(undefined);
    } else {
      setUserData(data.session.user);  
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])
  
  return (
    <userContext.Provider value={userData}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/auth" element={<TestAuth />} />
          <Route exact path="/conv" element={<ConversationsList />} />
          <Route path="/groups" element={<GroupsList />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path='/contacts/add' element={<AddContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/edit/avatar" element={<ChangeAvatarPage />} />
          <Route path="/settings/edit/status" element={<ChangeStatusPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route exact path="/user/verify" element={<Homepage />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/conv/:id" element={<Conversation />} />
          <Route exact path="/group/create" element={<GroupCreatePage />} />
          <Route path="/group/:id" element={<Group />} />
          <Route path="/group/:id/details" element={<GroupInfo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </userContext.Provider>

  )
}