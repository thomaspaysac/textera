export const ErrorContainer = ({ error }) => {
  if (!error) {
    return null;
  }
  
  return (
    <div className="error_container">
      <ul>
      {
          error.map((el, i) => {
            return (
              <li key={i}>
                {el.msg}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}