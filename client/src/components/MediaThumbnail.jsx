import { Link } from "react-router-dom"

export const MediaThumbnail = ({ imageUrl }) => {
  return (
    <Link to={imageUrl}>
      <div className="media-thumbnail">
        <img src={imageUrl} alt='' />
      </div>
    </Link>
  )
}