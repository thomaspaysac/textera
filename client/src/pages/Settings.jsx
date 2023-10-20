import { useState, useEffect } from "react"

import { Layout } from "../components/Layout"
import { AvatarSmall } from "../components/AvatarSmall";

export const SettingsPage = () => {
  const [user, setUser] = useState();

  const fetchUserData = async () => {
    const req = await fetch('https://textera-production.up.railway.app/user/' + localStorage.user_id);
    const res = await req.json()
    setUser(res);
  }

  useEffect (() => {
    fetchUserData();
  }, [])

  if (!user) {
    return (
      <Layout>
        <div>
          Loading...
        </div>
      </Layout>
    )
  }

  return (  
      <Layout>
        <div>{user.username}</div>
        <div>{user.status}</div>
        <AvatarSmall imageUrl={user.avatar} />
      </Layout>
    
  )
}