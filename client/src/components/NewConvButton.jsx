import { useNavigate } from "react-router-dom"

export const NewConvButton = ({ link }) => {
  const navigateTo = useNavigate();

  return (
    <button className="newConvButton" onClick={() => navigateTo(link)}>+</button>
  )
}