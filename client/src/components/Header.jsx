import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import { AvatarSmall } from "./AvatarSmall";
import logo from '../assets/logo_transparent2.png';

const UserContainer = () => {
  const userData = useContext(userContext);

  useEffect(() => {
  }, [userData])

  if (!userData) {
    return null
  } else {
    return (
      <div className="user-container">
        <AvatarSmall imageUrl={localStorage.avatar} />
      </div>
    )
  }
}

const Header = () => {
  return (
    <header>
      <Link to="/" state={{tab: null}}>
        <div className="logo_main">
          <img src={logo} alt='' />
        </div>
      </Link>
    </header>
  )
}

export default Header;