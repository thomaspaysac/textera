import { useState, useEffect } from 'react'
import './App.css'
import { UserProfile } from './pages/UserProfile';

function App() {
  const [message, setMessage] = useState('lol');

  const getMessage = async () => {
    const req = await fetch('http://localhost:3000/test');
    const res = await req.json();
    setMessage(res);
  }

  useEffect(() => {
    getMessage()
  }, []);

  return (
    <>
      <button onClick={() => console.log(message)}>Click !</button>
      <UserProfile />
    </>
  )
}

export default App
