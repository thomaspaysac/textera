import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ErrorContainer } from "../components/ErrorContainer";

export const Signup = () => {
  const [error, setError] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const navigateTo = useNavigate();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  }

  const signup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const req = await fetch(`https://textera-production.up.railway.app/user/signup`, {
      method: 'POST',
      body: formData,
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

  return (
    <>
      <main>
        <h2 className="page-title">Sign up</h2>
        <form id='signup_form' className='form' onSubmit={signup}>

          <div>
            <label htmlFor="username">Name: </label>
            <input type='text' id='username' name='username' />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type='password' id='password' name='password' />
          </div>
          <div>
            <label htmlFor="avatar">Avatar: </label>
            <input type='file' id='avatar' name='avatar' onChange={onFileChange}  />
          </div>
          <button type='submit' className="button_primary">Sign up</button>
        </form>
      </main>
    </>
  )


}