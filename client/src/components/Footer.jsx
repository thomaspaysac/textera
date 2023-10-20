import { Link, useLocation } from 'react-router-dom'

import conversations from '../assets/icons/conversation.png'
import groups from '../assets/icons/group-chat.png'
import settings from '../assets/icons/settings.png'
import login from '../assets/icons/login.png'

export const Footer = () => {
  const activeTab = useLocation().state.activeTab;

  if (localStorage.logged_in) {
    return (
      <footer>
        <Link to='/' state={{activeTab: 'messages'}}>
        <div className={`footer-button ${activeTab === 'messages' ? ' active' : ''}`}>
          <div className='footer-icon'>
            <img src={conversations} alt='messages tab' />
          </div>
          <div>Messages</div>
        </div>
        </Link>
        
        <Link to='/login' state={{activeTab: 'groups'}}>
        <div className={`footer-button ${activeTab === 'groups' ? ' active' : ''}`}>
          <div className='footer-icon'>
            <img src={groups} alt='groups tab' />
          </div>
          <div>Groups</div>
        </div>
        </Link>
        
        <Link to='/settings' state={{activeTab: 'settings'}}>
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
      <div className='footer-button'>
        <div className='footer-icon'>
          <img src={login} alt='login button' />
        </div>
        <div>Login</div>
      </div>
    </footer>
  )

  
}