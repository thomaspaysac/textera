export const MessageSingle = (props) => {
  const DisplayFile = () => {
    if (!props.file) {
      return null;
    } else {
      return (
        <a href={props.file} target="_blank" rel="noreferrer">
          <div className="message_file">
            <img src={props.file} />
          </div>
        </a>
        
      )
    }
  }

  return (
    <div className={'message-single message_' + props.author}>
      <DisplayFile />
      <div>
        {props.content}
      </div>
      <div className="message_timestamp">
        {props.timestamp}
      </div>
    </div>
  )
}