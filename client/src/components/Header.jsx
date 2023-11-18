import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { AvatarSmall } from "./AvatarSmall";
import logo from '../assets/logo_transparent2.png';

const UserContainer = () => {
  const userData = useContext(userContext);
  const navigateTo = useNavigate();

  const logout = () => {
    if (window.confirm('Do you really want to log out ?')) {
      localStorage.clear();
      navigateTo('/');
    } else {
      return;
    }
  }

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
      <UserContainer />
    </header>
  )
}

export default Header;