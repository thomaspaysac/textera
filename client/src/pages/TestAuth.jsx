import { useState, useEffect, useContext } from "react"
import { supabase } from "../App";
import { userContext } from "../App";
import { Layout } from "../components/Layout";

export const TestAuth = () => {
  const userData = useContext(userContext);

  const logout = async () => {
    await supabase.auth.signOut();
  }

  const fetchData = async () => {
    const req = await fetch('http://localhost:3000/test');
    const res = await req.json();
    console.log(res);
  }

  /*useEffect(() => {
    fetchData();
  }, [])*/

  return (
    <Layout>
      <div className="content">
        <button onClick={() => console.log(userData)}>Click me!</button>
      </div>
      <button onClick={logout}>Log out</button>
    </Layout>
  )
}