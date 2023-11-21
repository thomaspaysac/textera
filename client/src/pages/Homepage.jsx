import { useState, useEffect, useContext } from "react";
import { Layout } from "../components/Layout";
import { userContext } from "../App";
import { supabase } from "../App";
import { useNavigate } from "react-router-dom";

import homeImage from "../assets/undraw_mobile_messages_re_yx8w.svg"

export const Homepage = () => {
  const userData = useContext(userContext);
  const navigateTo = useNavigate();

  const GuestLogin = () => {
    const login = async () => {
      await supabase.auth.signInWithPassword({
        email: "rando@email.com",
        password: "randomizer",
      });
      navigateTo('/conv');
      location.reload();
    }

    if (userData) {
      return null
    }

    return (
      <button className="guest-button" onClick={login}>
        Try with a guest account
      </button>
    )
  }

  return (
      <Layout>
        <div className="content homepage">
          <div className="heading">
            <div>Welcome to</div>
            <div>Textera</div>
          </div>
          <img src={homeImage} alt="" className="homepage-image" />
          <GuestLogin />
        </div>
      </Layout>
  )
}