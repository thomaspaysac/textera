import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Layout } from "../components/Layout"
import { AvatarBig } from "../components/AvatarBig"

export const ChangeAvatarPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const navigateTo = useNavigate();

  const submitImage = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(e.target);
    formData.append('userID', localStorage.user_id);
    const req = await fetch('http://localhost:3000/user/edit/avatar', {
    //const req = await fetch('https://textera-production.up.railway.app/user/edit/avatar', {
      method: 'PATCH',
      body: formData
    })
    const res = await req.json();
    if (res.errors.length !== 0) {
      setErrorMessage(res.errors)
    } else {
      localStorage.avatar = res.newAvatar;
      navigateTo('/settings');
    }
  }

  const deleteAvatar = async () => {
    if (window.confirm('Do you really want to delete your avatar?')) {
      const data = { userID: localStorage.user_id };
      await fetch('http://localhost:3000/user/edit/avatar/delete', {
      //await fetch('https://textera-production.up.railway.app/user/edit/avatar/delete', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      localStorage.avatar = "https://firebasestorage.googleapis.com/v0/b/textera-e04fe.appspot.com/o/avatar-default.png?alt=media&token=b90f49d9-7495-42b4";
      navigateTo('/settings');  
    }
  }

  const ErrorContainer = () => {
    if (!errorMessage) {
      return null
    } else {
      return (
        <div className="error-container">
          {
            errorMessage.map((el, i) => {
              return (
                <div key={`error-${i}`}>{el}</div>
              )
            })
          }
        </div>
      )
    }
  }

  return (
    <Layout>
      <div className="content change-avatar-page">
        <AvatarBig imageUrl={localStorage.avatar} />
        <form onSubmit={submitImage}>
          <button type="button"><label htmlFor="avatar">Change avatar</label></button>
          <input type="file" id="avatar" name="avatar" accept="image/*" style={{display: 'none'}} />
          <button type="submit">Save</button> 
        </form>
        <ErrorContainer />
        <button onClick={() => deleteAvatar()}>Delete avatar</button>
      </div>
    </Layout>
  )
}