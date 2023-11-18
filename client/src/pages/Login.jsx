import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { supabase } from "../App";

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigateTo = useNavigate();

  // Supabase login
  const login = async (e) => {
    e.preventDefault();
    const form = document.getElementById('login_form');
    const data = {};
    new FormData(form).forEach((value, key) => data[key] = value);
    const { fn, error } = await supabase.auth.signInWithPassword({
      email: data.username + "@email.com",
      password: data.password,
    });
    if (error) {
      setErrorMessage('There was an error: check your username and password.');
    } else {
      navigateTo('/conv');
      location.reload();
    }
  }

  const ErrorContainer = () => {
    if (!errorMessage) {
      return null
    }

    return (
      <div className="error-container">
        {errorMessage}
      </div>
    )
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
            <button type='submit' className="button_primary"><b>Log in</b></button>
          </form>
          <ErrorContainer />
        </div>
      </Layout>
    
  )
}