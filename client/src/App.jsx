import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState('lol');

  const getMessage = async () => {
    const req = await fetch('http://localhost:3000/test');
    const res = await req.json();
    setMessage(res);
  }

  useEffect(() => {
    getMessage()
  }, [message]);

  return (
    <>
      <button onClick={() => console.log(message)}>Click !</button>
    </>
  )
}

export default App
