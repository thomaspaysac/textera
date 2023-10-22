import { Link } from "react-router-dom"
import { AvatarSmall } from "./AvatarSmall"

export const MessageOverview = ({ message }) => {
  const usersList = (user) => {
    if (user._id === localStorage.user_id) {
      return null
    } else {
      return (
        <div key={user._id} className="message-overview">  
            <AvatarSmall imageUrl={user.avatar} />
          {user.username}
        </div>
      )
    }
  }

  return (
    <Link to={`/conv/${message._id}`}>
        {
          message.users.map((el) => {
            return (
              usersList(el)
            )
          })
        }
    </Link>
  )
}