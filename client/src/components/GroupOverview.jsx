import { useEffect } from "react"
import { Link } from "react-router-dom"
import { AvatarSmall } from "./AvatarSmall"

export const GroupOverview = ({ group }) => {
  return (
    <Link to={`/group/${group._id}`} className="group-overview_link">
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