import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";

export const LoginPage = () => {
  const [error, setError] = useState();
  const navigateTo = useNavigate();

//https://textera-production.up.railway.app/user/login
  const login = async (e) => {
    e.preventDefault();
    const form = document.getElementById('login_form');
    const data = {};
    new FormData(form).forEach((value, key) => data[key] = value);
    const req = await fetch(`https://textera-production.up.railway.app/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    if (req.status !== 200) {
      setError(true);
    } else {
      const res = await req.json();
      localStorage.setItem('username', res.userInfo.username);
      localStorage.setItem('user_id', res.userInfo._id);
      localStorage.setItem('avatar', res.userInfo.avatar);
      localStorage.setItem('logged_in', true);
      console.log(localStorage);
      navigateTo('/');
    }
  }

  return (
    <>
      <Layout>
        <h2 className="page-title">Log in</h2>
        <form id='login_form' className="form" onSubmit={login}>
          <div>
            <label htmlFor="username">Username: </label>
            <input type='text' id='username' name='username' />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type='password' id='password' name='password'/>
          </div>
          <button type='submit' className="button_primary">Log in</button>
        </form>
      </Layout>
    </>
  )
}