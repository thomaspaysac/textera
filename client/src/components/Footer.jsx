import conversations from '../assets/icons/conversation.png'
import groups from '../assets/icons/group-chat.png'
import settings from '../assets/icons/settings.png'
import login from '../assets/icons/login.png'

export const Footer = () => {
  if (localStorage.logged_in) {
    return (
      <footer>
        <div className="footer-button">
          <div className='footer-icon'>
            <img src={conversations} alt='conversations tab' />
          </div>
          <div>Conv</div>
        </div>
        <div className="footer-button">
          <div className='footer-icon'>
            <img src={groups} alt='groups tab' />
          </div>
          <div>Groups</div>
        </div>
        <div className="footer-button">
          <div className='footer-icon'>
            <img src={settings} alt='settings tab' />
          </div>
          <div>Settings</div>
        </div> 
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