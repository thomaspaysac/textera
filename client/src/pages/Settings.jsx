import { useState, useEffect } from "react"

import { Layout } from "../components/Layout"
import { AvatarBig } from "../components/AvatarBig";

import imageIcon from '../assets/icons/image_upload.png'
import statusIcon from '../assets/icons/status.png'
import logoutIcon from '../assets/icons/logout.png'


export const SettingsPage = () => {
  const [user, setUser] = useState();

  const logout = () => {
    if (window.confirm('Do you really want to log out ?')) {
      localStorage.clear();
      navigateTo('/');
    } else {
      return;
    }
  }

  const fetchUserData = async () => {
    const req = await fetch('http://localhost:3000/user/' + localStorage.user_id);
    //const req = await fetch('https://textera-production.up.railway.app/user/' + localStorage.user_id);
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
        <div className="content settings-page">
          <div className="user-info">
            <AvatarBig imageUrl={user.avatar} />
            <div className="user_name">{user.username}</div>
            <div className="user_status">{user.status}</div>
          </div>
          <div className="actions">
            <button>
              <img src={imageIcon} alt="" />Change avatar
            </button>
            <button>
              <img src={statusIcon} alt="" />Change status
            </button>
            <button onClick={logout}>
              <img src={logoutIcon} alt="" />
              Log out
            </button>
          </div>
        </div>
      </Layout>
    
  )
}