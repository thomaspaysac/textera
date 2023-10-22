export const MessageSingle = ({ message }) => {
  return (
    <>
      <div>
        {message.author}
      </div>
      <div>
        {message.content}
      </div>
      <div>
        {message.timestampFormatted}
      </div>
    </>
  )
}