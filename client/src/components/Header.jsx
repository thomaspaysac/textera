import { useNavigate } from "react-router-dom";
import { AvatarSmall } from "./AvatarSmall";
import logo from '../assets/logo.png';

const UserContainer = () => {
  const navigateTo = useNavigate();

  const logout = () => {
    if (window.confirm('Do you really want to log out ?')) {
      localStorage.clear();
      navigateTo('/');
    } else {
      return;
    }
  }

  if (localStorage.logged_in) {
    return (
      <div className="user-container">
        <AvatarSmall imageUrl={localStorage.avatar} />
        <div className="header_expanded">{localStorage.username}</div>
        <button className="header_expanded" onClick={logout}>Logout</button>
      </div>
    )
  }

  return null;

}

const Header = () => {
  return (
    <header>
      <div className="logo_main">
        <img src={logo} alt='' />
      </div>
      <UserContainer />
    </header>
  )
}

export default Header;