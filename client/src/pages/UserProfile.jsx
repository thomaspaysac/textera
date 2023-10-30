import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AvatarBig } from "../components/AvatarBig";
import { AvatarSmall } from "../components/AvatarSmall";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

export const UserProfile = () => {
  const [user, setUser] = useState();
  const [contacts, setContacts] = useState([]);
  const [conversation, setConversation] = useState([]);
  const { id } = useParams();
  const navigateTo = useNavigate();

  const fetchUsers = async () => {
    const userReq = await fetch('http://localhost:3000/user/' + id);
    //const req = await fetch('https://textera-production.up.railway.app/user/' + id);
    const userRes = await userReq.json()
    setUser(userRes);
    const ownReq = await fetch('http://localhost:3000/user/' + localStorage.user_id);
    //const req = await fetch('https://textera-production.up.railway.app/user/' + id);
    const ownRes = await ownReq.json()
    setContacts(ownRes.contacts);
    const convReq = await fetch('http://localhost:3000/conversation/users/' + localStorage.user_id + '/' + id)
    //const convReq = await fetch('https://textera-production.up.railway.app/conversation/users/' + localStorage.user_id + '/' + id);
    const convRes = await convReq.json();
    setConversation(convRes);
  }

  const addToContacts = async () => {
    await fetch('http://localhost:3000/user/' + localStorage.user_id + '/add/' + id, {
    //await fetch('https://textera-production.up.railway.app/user/' + localStorage.user_id + '/add' + id, {
      method: 'POST',
    })
  }

  const createConversation = async () => {
    const users = {
      user1: localStorage.user_id,
      user2: user._id,
    };
    const req = await fetch('http://localhost:3000/conversation/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    })
    const res = await req.json();
    navigateTo('/conv/' + res._id);
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

  const ConversationPrompt = () => {
    if (contacts.includes(user._id) && conversation.length === 0) {
      return (
        <div onClick={createConversation}>
          Start a new conversation
        </div>
      )
    } else if (contacts.includes(user._id)) {
      return (
        <Link to={`/conv/${conversation[0]._id}`}>
          Go to conversation
        </Link>
      )
    }
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
          <ConversationPrompt />
        </div>
      </Layout>
  )
}