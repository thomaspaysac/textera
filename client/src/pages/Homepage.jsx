import { useState, useEffect } from "react";

export const Homepage = () => {
  const [message, setMessage] = useState();

  const loadTest = async () => {
    const req = await fetch('https://textera-production.up.railway.app/test');
    const res = await req.json();
    setMessage(res);
  }

  useEffect(() => {
    loadTest();
  }, [])

  return (
    <>
      <h1>Welcome</h1>
      <button onClick={() => console.log(message)}>Test button</button>
    </>
  )
}