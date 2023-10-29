import { Layout } from "../components/Layout"
import { useState } from "react";

export const AddContactPage = () => {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const addContact = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const contactReq = await fetch('http://localhost:3000/user/username/' + data.username);
    //const contactReq = await fetch('https://textera-production.up.railway.app/user/username/' + data.username);
    const contactRes = await contactReq.json();
    if (contactRes.length === 0) {
      const err = 'User not found';
      setError(true);
      setErrorMessage(err);
    } else {
      const req = await fetch('http://localhost:3000/user/' + localStorage.user_id + '/add/' + contactRes[0]._id, {
        //const req = await fetch('https://textera-production.up.railway.app/user/' + localStorage.user_id + '/add' + contactRes[0]._id, {
        method: 'POST',
      })
      if(req.status !== 200) {
        const err = await req.json();
        setError(true);
        setErrorMessage(err);
      } else {
        console.log('user added')
      }

    }
  }

  const errorContainer = () => {
    if (!error) {
      return null
    }

    return (
      <div>
        {errorMessage}
      </div>
    )
  }

  return (
    <Layout>
      <div className="content add-contact_page">
        Enter user info to add to your contacts
        <form id="add-contact_form" onSubmit={addContact}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type='text' id='username' name="username" />
          </div>
          <button type='submit'>Add contact</button>
        </form>
        {errorContainer()}
      </div>
    </Layout>
  )
}