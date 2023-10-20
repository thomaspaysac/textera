import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import conversations from '../assets/icons/conversation.png'
import groups from '../assets/icons/group-chat.png'
import settings from '../assets/icons/settings.png'
import login from '../assets/icons/login.png'

export const Footer = () => {
  const [activeTab, setActiveTab] = useState('messages');

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab])

  if (localStorage.logged_in) {
    return (
      <footer>
        <Link to='/'>
          <div className={`footer-button ${activeTab === 'messages' ? ' active' : ''}`} onClick={() => setActiveTab('messages')}>
            <div className='footer-icon'>
              <img src={conversations} alt='messages tab' />
            </div>
            <div>Messages</div>
          </div>
        </Link>
        
        <Link to='/' onClick={() => setActiveTab('groups')}>
          <div className={`footer-button ${activeTab === 'groups' ? ' active' : ''}`} onClick={() => setActiveTab('groups')}>
            <div className='footer-icon'>
              <img src={groups} alt='groups tab' />
            </div>
            <div>Groups</div>
          </div>
        </Link>
        

        <Link to='/settings' onClick={() => setActiveTab('settings')}>
          <div className={`footer-button ${activeTab === 'settings' ? ' active' : ''}`} >
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
      <div className='footer-button'>
        <div className='footer-icon'>
          <img src={login} alt='login button' />
        </div>
        <div>Login</div>
      </div>
    </footer>
  )

  
}