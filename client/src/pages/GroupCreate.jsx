import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { Layout } from "../components/Layout"
import { AvatarVerySmall } from "../components/AvatarVerySmall";

export const GroupCreatePage = () => {
  const [contacts, setContacts] = useState();
  const [users, setUsers] = useState([localStorage.user_id]);
  const [usernames, setUsernames] = useState([{id: localStorage.user_id, username : localStorage.username, avatar: localStorage.avatar}]);

  const navigateTo = useNavigate();

  const fetchContacts = async () => {
    const req = await fetch('http://localhost:3000/user/' + localStorage.user_id + '/contacts');
    //const req = await fetch('https://textera-production.up.railway.app/user/' + localStorage.user_id + '/contacts');
    const res = await req.json()
    setContacts(res);
  }

  useEffect(() => {
    fetchContacts();
  }, [])

  const createGroup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('admin', localStorage.user_id);
    users.forEach((el, i) => {
      formData.append('users[]', users[i])
      }
    )
    const req = await fetch(`http://localhost:3000/group/create`, {
      //const req = await fetch(`https://textera-production.up.railway.app/group/create`, {
        method: 'POST',
        body: formData,
      });
    const res = await req.json();
    navigateTo('/group/' + res);
  }

  const addUser = () => {
    const option = document.getElementById('usersSelect');
    const userData = {
      username: option.options[option.selectedIndex].getAttribute('data-username'),
      avatar: option.options[option.selectedIndex].getAttribute('data-avatar'),
    }
    //const username = option.options[option.selectedIndex].getAttribute('data-username');
    const tempUsers = users.slice();
    setUsers([...tempUsers, option.value]);
    const tempUsernames = usernames.slice();
    setUsernames([...tempUsernames, userData]);
  }

  const removeUser = (n) => {
    const temp = users.slice();
    temp.splice(n, 1);
    setUsers([...temp]);
    const tempUsernames = usernames.slice();
    tempUsernames.splice(n, 1);
    setUsernames([...tempUsernames]);
  }

  const usersList = (el, i) => {
    if (el.id === localStorage.user_id) {
      return (
        <div key={el.id}>
          <AvatarVerySmall imageUrl={usernames[i].avatar} />
          {usernames[i].username}
        </div>
      )
    } else {
      return (
      <div key={el.id}>
        <AvatarVerySmall imageUrl={usernames[i].avatar} />
        {usernames[i].username}
        <input type="button" onClick={() => removeUser(i)} value="Remove" />
      </div>
    )
      }
  }

  if (!contacts) {
    return null
  }

  return (
    <Layout>
      <div className="content group-create-page">
        <h2 onClick={() => console.log(usernames)}>Create a new group</h2>
        <form id="group-create_form" onSubmit={createGroup}>
          <div>
            <label htmlFor="title">Group name:</label>
            <input type="text" id="title" name="title" />
          </div>
          <div>
            <label htmlFor="avatar">Group image: </label>
            <input type='file' id='image' name='image' />
          </div>
          <div>
            <label htmlFor="usersSelect">Add users:</label>
            <select name="usersSelect" id="usersSelect">
              {
                contacts.map((el) => {
                  if (users.includes(el._id)) {
                    return null
                  } else {
                    return (
                      <option key={el._id} data-username={el.username} data-avatar={el.avatar} value={el._id}>{el.username}</option>
                    )
                  }
                })
              }
            </select>
            <input type='button' onClick={() => addUser()} value='add user' />
          </div>
          <button type="submit">Create group</button>
        </form>
        {
          usernames.map((el, i) => {
            return (
              usersList(el, i)
            )
          })
        }
        </div>
    </Layout>
  )
}