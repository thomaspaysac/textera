import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AvatarBig } from "../components/AvatarBig";
import { AvatarSmall } from "../components/AvatarSmall";
import { Layout } from "../components/Layout";

export const UserProfile = () => {
  const [user, setUser] = useState();
  const { id } = useParams();

  const logout = () => {
    if (window.confirm('Do you really want to log out ?')) {
      localStorage.clear();
      navigateTo('/');
    } else {
      return;
    }
  }

  const fetchUser = async () => {
    // https://textera-production.up.railway.app/user/
    const req = await fetch('http://localhost:3000/user/' + id);
    const res = await req.json()
    setUser(res);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  if (!user) {
    return (
        <Layout>
          <div>
            Looking for user...
          </div>
        </Layout>
    )
  }

  return (
      <Layout>
        <div className="content user-profile">
          <AvatarBig imageUrl={user.avatar} />
          <div className="user_name">{user.username}</div>
          <div className="user_status">{user.status}</div>
        </div>
        <div>
          <button onClick={logout}>Log out</button>
        </div>
      </Layout>
  )
}