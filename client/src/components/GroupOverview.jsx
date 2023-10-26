import { useEffect } from "react"
import { Link } from "react-router-dom"
import { AvatarSmall } from "./AvatarSmall"

export const GroupOverview = ({ group }) => {
  useEffect(() => {
    console.log(group)
  })

  const groupImage = (group) => {
    return (
      <AvatarSmall key={user._id} imageUrl={user.avatar} />
    )
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
    <Link to={``} className="group-overview_link">
      <div className="group-overview">
        <div className="group-image">
          <AvatarSmall imageUrl={group.image} />
        </div>
        <div className="group-overview_content">
          <div className="group-overview_metadata">
            <div className="group_name">
              {group.title}
            </div>
            <div className="last-update">
              {group.lastUpdate}
            </div>
          </div>       
          <div className="last-message">
            {group.lastMessageFormatted}
          </div>
        </div>
        
      </div>
        
    </Link>
  )
}