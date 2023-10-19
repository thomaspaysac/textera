import { useState } from "react";

export const LoginPage = () => {
  const [error, setError] = useState();

  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
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
      const result = await req.json();
      localStorage.setItem('username', result.userInfo.username);
      localStorage.setItem('user_id', result.userInfo._id);
      localStorage.setItem('role', result.userInfo.role);
      localStorage.setItem('logged_in', true);
    }
  }

  return (
    <>
      <main>
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
      </main>
    </>
  )
}