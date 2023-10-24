import { useEffect } from "react"

export const MessageSingle = (props) => {
  const DisplayFile = () => {
    if (!props.file) {
      return null;
    } else {
      return (
        <div className="message_file">
          <img src={props.file} />
        </div>
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