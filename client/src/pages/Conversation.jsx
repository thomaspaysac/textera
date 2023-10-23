import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout";
import { ConversationHeader } from "../components/ConversationHeader";
import { MessageInputField } from "../components/MessageInputField";

export const Conversation = () => {
  const [messages, setMessages] = useState();
  const [correspondant, setCorrespondant] = useState();
  const { id } = useParams();
  const messagesEndRef = useRef(null)

  const fetchConv = async () => {
    const req = await fetch('http://localhost:3000/messages/conv/' + id);
    const res = await req.json();
    setMessages(res);
    const convReq = await fetch('http://localhost:3000/conversation/' + id)
    const convRes = await convReq.json();
    convRes.users.forEach((el) => {
      return el._id === localStorage.user_id ? null : setCorrespondant(el);
    })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block:"end" })
  }

  useEffect(() => {
    fetchConv();
  }, [])

  useEffect(() => {
    scrollToBottom();
  })

  if (!messages || !correspondant) {
    return null;
  }

  return (
    <Layout>
      <ConversationHeader name={correspondant.username} image={correspondant.avatar} id={correspondant._id} />
      <div className="content">
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
                <div className="message_content">
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
        <div className="content-end" ref={messagesEndRef}></div>
      </div>
      <MessageInputField conversationID={id} />
    </Layout>
  )
}