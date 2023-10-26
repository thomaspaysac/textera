import { Link } from "react-router-dom"
import { AvatarSmall } from "./AvatarSmall"
import { useEffect } from "react"

export const ConversationOverview = ({ message }) => {
  const conversationImage = (user) => {
    if (user._id === localStorage.user_id) {
      return null
    } else {
      return (
        <AvatarSmall key={user._id} imageUrl={user.avatar} />
      )
    }
  }

  const usersList = (user) => {
    if (user._id === localStorage.user_id) {
      return null
    } else {
      return (
        <div key={user._id} className="conversation_name">  
          {user.username}
        </div>
      )
    }
  }

  return (
    <Link to={`/conv/${message._id}`} className="conversation-overview_link">
      <div className="conversation-overview">
        <div className="conversation-image">
          {
            message.users.map((el) => {
              return (
                conversationImage(el)
              )
            })
          }
        </div>
        <div className="conversation-overview_content">
          <div className="conversation-overview_metadata">
            {
              message.users.map((el) => {
                return (
                  usersList(el)
                )
              })
            }
            <div className="last-update">
              {message.lastUpdate}
            </div>
          </div>       
          <div className="last-message">
            {message.lastMessageFormatted}
          </div>
        </div>
        
      </div>
        
    </Link>
  )
}