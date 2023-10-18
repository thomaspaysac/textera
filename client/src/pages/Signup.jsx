import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ErrorContainer } from "../components/ErrorContainer";

export const Signup = () => {
  const [error, setError] = useState();
  const navigateTo = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const req = await fetch(`https://textera-production.up.railway.app/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify({
        name: data.name,
        password: data.password,
      }),
      file: data.avatar,
    });
    const errors = await req.json();
    console.log(errors);
    if (errors.length > 0) {
      setError(errors);
    } else {
      navigateTo('/');
    }
    navigateTo('/');
  }

  //<form id='signup_form' action='https://textera-production.up.railway.app/user/signup' encType="multipart/form-data" method='POST' className='form'>


  return (
    <>
      <main>
        <h2 className="page-title">Sign up</h2>
        <form id='signup_form' className='form' onSubmit={signup}>
          <div>
            <label htmlFor="name">Name: </label>
            <input type='text' id='name' name='name' />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type='password' id='password' name='password' />
          </div>
          <div>
            <label htmlFor="avatar">Avatar: </label>
            <input type='file' id='avatar' name='avatar' />
          </div>
          <button type='submit' className="button_primary">Sign up</button>
        </form>
      </main>
    </>
  )


}