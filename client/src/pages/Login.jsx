import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";

export const LoginPage = () => {
  const [error, setError] = useState();
  const navigateTo = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const form = document.getElementById('login_form');
    const data = {};
    new FormData(form).forEach((value, key) => data[key] = value);
    const req = await fetch(`http://localhost:3000/user/login`, {
    //const req = await fetch(`https://textera-production.up.railway.app/user/login`, {
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
      console.log(res);
      localStorage.setItem('username', res.userInfo.username);
      localStorage.setItem('user_id', res.userInfo._id);
      localStorage.setItem('avatar', res.userInfo.avatar);
      localStorage.setItem('status', res.userInfo.status);
      localStorage.setItem('logged_in', true);
      navigateTo('/conv');
    }
<<<<<<< Updated upstream
=======
  }*/

  // Supabase login
  const login = async (e) => {
    e.preventDefault();
    const form = document.getElementById('login_form');
    const data = {};
    new FormData(form).forEach((value, key) => data[key] = value);
    await supabase.auth.signInWithPassword({
      email: data.username + "@email.com",
      password: data.password,
    })
    /*const req = await fetch(`http://localhost:3000/user/login`, {
      //const req = await fetch(`https://textera-production.up.railway.app/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });*/
>>>>>>> Stashed changes
  }

  return (
      <Layout>
        <div className="content login-page">
          <h2 className="page-title">Log in</h2>
          <form id='login_form' className="form" onSubmit={login}>
            <div className="input-group">
              <label htmlFor="username">Username: </label>
              <input type='text' id='username' name='username' />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password: </label>
              <input type='password' id='password' name='password'/>
            </div>
            <button type='submit' className="button_primary">Log in</button>
          </form>
        </div>
      </Layout>
    
  )
}