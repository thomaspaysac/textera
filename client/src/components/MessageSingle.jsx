import { AvatarVerySmall } from "./AvatarVerySmall";

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

  const authorAvatar = () => {
    if (!props.avatar) {
      return null
    }

    return (
      <div>
        <AvatarVerySmall imageUrl={props.avatar} />
      </div>
    )
  }

  const messageAuthor = () => {
    if (!props.username) {
      return null
    }
    
    return (
      <div className="message-single_author">
        {props.username}
      </div>
    )
  }

  if (props.group === true) {
    return (
      <div className={"group-message_" + props.author}>
        {authorAvatar()}
        <div className={'message-single'}>
          {messageAuthor()}
          <DisplayFile />
          <div>
            {props.content}
          </div>
          <div className="message_timestamp">
            {props.timestamp}
          </div>
        </div>
      </div>
    )
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