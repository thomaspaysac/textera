import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AvatarBig } from "../components/AvatarBig";
import { AvatarSmall } from "../components/AvatarSmall";
import { Layout } from "../components/Layout";

export const UserProfile = () => {
  const [user, setUser] = useState();
  const [contacts, setContacts] = useState([]);
  const { id } = useParams();



  const fetchUsers = async () => {
    const userReq = await fetch('http://localhost:3000/user/' + id);
    //const req = await fetch('https://textera-production.up.railway.app/user/' + id);
    const userRes = await userReq.json()
    setUser(userRes);
    const ownReq = await fetch('http://localhost:3000/user/' + localStorage.user_id);
    //const req = await fetch('https://textera-production.up.railway.app/user/' + id);
    const ownRes = await ownReq.json()
    setContacts(ownRes.contacts);
  }

  const addToContacts = async () => {
    await fetch('http://localhost:3000/user/' + localStorage.user_id + '/add/' + id, {
    //await fetch('https://textera-production.up.railway.app/user/' + localStorage.user_id + '/add' + id, {
      method: 'POST',
    })
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const AddContactButton = () => {
    if (contacts.includes(user._id)) {
      return null
    } 
    
    return (
      <button onClick={addToContacts}>+ Add to contacts</button>
    )
  }


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
          <div className="user_name" onClick={() => console.log(contacts.includes(user._id))}>{user.username}</div>
          <div className="user_status">{user.status}</div>
          <AddContactButton />
        </div>
      </Layout>
  )
}