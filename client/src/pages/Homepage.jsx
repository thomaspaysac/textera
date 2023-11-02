import { useState, useEffect, useContext } from "react";
import { Layout } from "../components/Layout";

import homeImage from "../assets/undraw_mobile_messages.svg"

export const Homepage = () => {
  return (
      <Layout>
      <div className="content homepage">
          <div className="heading">
            <div>Welcome to</div>
            <div>Textera</div>
          </div>
          <img src={homeImage} alt="" className="homepage-image" />
      </div>
      </Layout>
  )
}