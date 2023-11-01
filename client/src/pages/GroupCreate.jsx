import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { Layout } from "../components/Layout"

export const GroupCreatePage = () => {
  const [contacts, setContacts] = useState();
  const [users, setUsers] = useState([localStorage.user_id]);

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
    const temp = users.slice();
    setUsers([...temp, option.value]);
  }

  const removeUser = (n) => {
    const temp = users.slice();
    temp.splice(n, 1);
    setUsers([...temp]);
  }

  const usersList = (n) => {
    return (
      <div key={n}>
        {users[n]}
        <input type="button" onClick={() => removeUser(n)} value="Remove" />
      </div>
    )
  }

  if (!contacts) {
    return null
  }

  return (
    <Layout>
      <div className="content group-create-page">
        <form id="group-create_form" onSubmit={createGroup}>
          <div>
            <label htmlFor="title" onClick={()=>console.log(users) }>Group name:</label>
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
                      <option key={el._id} value={el._id}>{el.username}</option>
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
          users.map((el, i) => {
            return (
              usersList(i)
            )
          })
        }
        </div>
    </Layout>
  )
}