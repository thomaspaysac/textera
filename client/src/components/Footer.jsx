import { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userContext } from '../App'

import conversations from '../assets/icons/conversation.png'
import contacts from '../assets/icons/contacts.png'
import groups from '../assets/icons/group-chat.png'
import settings from '../assets/icons/settings.png'
import login from '../assets/icons/login.png'
import signup from '../assets/icons/signup.png'

export const Footer = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const userData = useContext(userContext);

  const loc = useLocation();

  useEffect(() => {
    if (loc.state === null) {
      return;
    } else {
      setActiveTab(loc.state.tab);
    }
  }, [loc.state])


  if (userData) {
    return (
      <footer>
        <Link to='/conv' state={{tab: 'messages'}}>
        <div className={`footer-button ${activeTab === 'messages' ? ' active' : ''}`}>
          <div className='footer-icon'>
            <img src={conversations} alt='messages tab' />
          </div>
          <div>Messages</div>
        </div>
        </Link>
        
        <Link to='/groups' state={{tab: 'groups'}}>
        <div className={`footer-button ${activeTab === 'groups' ? ' active' : ''}`}>
          <div className='footer-icon'>
            <img src={groups} alt='groups tab' />
          </div>
          <div>Groups</div>
        </div>
        </Link>

        <Link to='/contacts' state={{tab: 'contacts'}}>
        <div className={`footer-button ${activeTab === 'contacts' ? ' active' : ''}`}>
          <div className='footer-icon'>
            <img src={contacts} alt='contacts tab' />
          </div>
          <div>Contacts</div>
        </div>
        </Link>
        
        <Link to='/settings' state={{tab: 'settings'}}>
        <div className={`footer-button ${activeTab === 'settings' ? ' active' : ''}`}>
          <div className='footer-icon'>
            <img src={settings} alt='settings tab' />
          </div>
          <div>Settings</div>
        </div>
        </Link>
      </footer>
    )
  }

  return (
    <footer>
      <Link to='/login' state={{tab: 'login'}}>
        <div className={`footer-button ${activeTab === 'login' ? ' active' : ''}`}>
          <div className='footer-icon'>
            <img src={login} alt='login button' />
          </div>
          <div>Log In</div>
        </div>
      </Link>

      <Link to='/signup' state={{tab: 'signup'}}>
        <div className={`footer-button ${activeTab === 'signup' ? ' active' : ''}`}>
          <div className='footer-icon'>
            <img src={signup} alt='login button' />
          </div>
          <div>Sign Up</div>
        </div>
      </Link>
    </footer>
  )

  
}