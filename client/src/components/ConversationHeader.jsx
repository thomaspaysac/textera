import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { AvatarSmall } from "./AvatarSmall";

export const ConversationHeader = (props) => {
  return (
    <Link to={'/user/' + props.id} className="conversation-header">
        <div>
          <AvatarSmall imageUrl={props.image} />
        </div>
        <div>{props.name}</div>
    </Link>
  )
}