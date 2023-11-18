import { Link } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../App"
import { AvatarSmall } from "./AvatarSmall"

export const ConversationOverview = ({ message }) => {
  const userData = useContext(userContext);

  const conversationImage = (user) => {
    if (user._id === userData.user_metadata.uid) {
      return null
    } else {
      return (
        <AvatarSmall key={user._id} imageUrl={user.avatar} />
      )
    }
  }

  const usersList = (user) => {
    if (user._id === userData.user_metadata.uid) {
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