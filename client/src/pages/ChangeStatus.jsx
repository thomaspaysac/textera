import { useNavigate } from "react-router-dom"

import { Layout } from "../components/Layout"

export const ChangeStatusPage = () => {
  const navigateTo = useNavigate();

  const submitStatus = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('userID', localStorage.user_id);
    const data = Object.fromEntries(formData.entries());
    const req = await fetch('http://localhost:3000/user/edit/status', {
    //const req = await fetch('https://textera-production.up.railway.app/user/edit/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const res = await req.json();
    if (res.errors.length !== 0) {
      return;
    } else {
      localStorage.status = data.status;
      navigateTo('/settings');
    }
  }
  
  return (
    <Layout>
      <div className="content">
      <form onSubmit={submitStatus}>
        <label htmlFor="status">Status: </label>
        <input type='text' id="status" name="status" defaultValue={localStorage.status} />
        <button type="submit">Change status</button>
      </form>
      </div>
    </Layout>
  )
}