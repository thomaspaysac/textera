export const LoginPage = () => {
  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const req = await fetch(`https://textera-production.up.railway.app/user/login`, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });
    const res = await req.json();
    console.log(res);
  }

  return (
    <>
      <main>
        <h2 className="page-title">Log in</h2>
        <form id="login_form" className="form" onSubmit={login}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" className="button_primary">Log in</button>
        </form>
      </main>
    </>
  )
}