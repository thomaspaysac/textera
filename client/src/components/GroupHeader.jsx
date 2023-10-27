import { Link } from "react-router-dom";
import { AvatarSmall } from "./AvatarSmall";

export const GroupHeader = (props) => {
  return (
    <Link to={'/group/' + props.id + '/details'} className="group-header">
        <div>
          <AvatarSmall imageUrl={props.image} />
        </div>
        <div>{props.name}</div>
    </Link>
  )
}