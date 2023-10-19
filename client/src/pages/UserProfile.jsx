import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
      <>
        <Layout>
          <div>
            Looking for user...
          </div>
        </Layout>
      </>
    )
  }

  return (
    <>
    <Layout>
      <div>{user.username}</div>
      <div>{user.status}</div>
      <AvatarSmall imageUrl={user.avatar} />
    </Layout>
      
    </>
  )
}