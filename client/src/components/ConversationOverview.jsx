import { Link } from "react-router-dom"
import { AvatarSmall } from "./AvatarSmall"
import { useEffect } from "react"

export const ConversationOverview = ({ message }) => {
  const usersList = (user) => {
    if (user._id === localStorage.user_id) {
      return null
    } else {
      return (
        <div key={user._id} className="conversation-overview_user-container">  
            <AvatarSmall imageUrl={user.avatar} />
          {user.username}
        </div>
      )
    }
  }

  return (
    <Link to={`/conv/${message._id}`}>
      <div className="conversation-overview">
        <div className="conversation-overview_metadata">
          {
            message.users.map((el) => {
              return (
                usersList(el)
              )
            })
          }
          <div>
            {message.lastUpdate}
          </div>
        </div>       
        <div>
          {message.lastMessageFormatted}
        </div>
      </div>
        
    </Link>
  )
}