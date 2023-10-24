export const MessageSingle = (props) => {
  return (
    <div className={'message-single message_' + props.author}>
      <div>
        {props.content}
      </div>
      <div className="message_timestamp">
        {props.timestamp}
      </div>
    </div>
  )
}