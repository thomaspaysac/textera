import { useEffect } from "react"

export const AvatarSmall = ({ imageUrl }) => {
  useEffect(() => {

  }, [imageUrl])

  return (
    <img
      className="avatar_thumbnail"
      src={imageUrl}
      alt='user avatar'
    />
  )
}