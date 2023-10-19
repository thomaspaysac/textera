import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout";
import { ErrorContainer } from "../components/ErrorContainer";

export const SignupPage = () => {
  const [error, setError] = useState();
  const navigateTo = useNavigate();

  //https://textera-production.up.railway.app/user/signup
  const signup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const req = await fetch(`http://localhost:3000/user/signup`, {
      method: 'POST',
      body: formData,
    });
    const errors = await req.json();
    if (errors.length > 0) {
      setError(errors);
    } else {
      navigateTo('/login');
    }
  }

  return (
    <>
      <Layout>
        <h2 className="page-title">Sign up</h2>
        <form id='signup_form' className='form' onSubmit={signup}>
          <div>
            <label htmlFor="username">Username: </label>
            <input type='text' id='username' name='username' />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type='password' id='password' name='password' />
          </div>
          <div>
            <label htmlFor='password_confirm'>Confirm password: </label>
            <input type="password" id="password_confirm" name="password_confirm" />
          </div>
          <div>
            <label htmlFor="avatar">Avatar: </label>
            <input type='file' id='avatar' name='avatar' />
          </div>
          <button type='submit' className="button_primary">Sign up</button>
        </form>
      </Layout>
    </>
  )
}