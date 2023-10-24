import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AvatarBig } from "../components/AvatarBig";
import { AvatarSmall } from "../components/AvatarSmall";
import { Layout } from "../components/Layout";

export const UserProfile = () => {
  const [user, setUser] = useState();
  const { id } = useParams();

  const fetchUser = async () => {
    const req = await fetch('https://textera-production.up.railway.app/user/' + id);
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
      </Layout>
  )
}