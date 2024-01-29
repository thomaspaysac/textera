import { Link } from "react-router-dom";
import { AvatarSmall } from "./AvatarSmall";

export const GroupHeader = (props) => {
  return (
    <Link to={'/group/' + props.id + '/details'} className="group-header">
        <div>
          <AvatarSmall imageUrl={props.image} />
        </div>
        <div className="group-header_name">{props.name}</div>
    </Link>
  )
}