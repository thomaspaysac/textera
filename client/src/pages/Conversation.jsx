import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout";
import { MessageSingle } from "../components/MessageSingle";

export const Conversation = () => {
  const [messages, setMessages] = useState();
  const { id } = useParams();

  const fetchConv = async () => {
    const req = await fetch('http://localhost:3000/messages/conv/' + id);
    const res = await req.json();
    setMessages(res);
  }

  useEffect(() => {
    fetchConv();
  }, [])

  if (!messages) {
    return null;
  }

  return (
    <Layout>
      <div onClick={() => console.log(messages)}>
        {id}
      </div>
      <div className='messages-list'>
      {
        messages.map((el) => {
          if (el.author._id === localStorage.user_id) {
            return (
            <div key={el._id} className="message-single message_own">
              <div>
                {el.content}
              </div>
              <div className="message_timestamp">
                {el.timestampFormatted}
              </div>
            </div>
          )
          } else {
            return (
            <div key={el._id} className="message-single message_other">
              <div>
                {el.content}
              </div>
              <div className="message_timestamp">
                {el.timestampFormatted}
              </div>
            </div>
          )
          }
        })
      }
      </div>
    </Layout>
  )
}