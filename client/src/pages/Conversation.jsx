import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout";
import { ConversationHeader } from "../components/ConversationHeader";
import { MessageInputField } from "../components/MessageInputField";
import { MessageSingle } from "../components/MessageSingle";

export const Conversation = () => {
  const [messages, setMessages] = useState();
  const [correspondant, setCorrespondant] = useState();
  const { id } = useParams();
  const messagesEndRef = useRef(null)

  const fetchConv = async () => {
    // https://textera-production.up.railway.app/messages/conv/
    const req = await fetch('http://localhost:3000/messages/conv/' + id);
    const res = await req.json();
    setMessages(res);
    // https://textera-production.up.railway.app/conversation/
    const convReq = await fetch('http://localhost:3000/conversation/' + id)
    const convRes = await convReq.json();
    convRes.users.forEach((el) => {
      return el._id === localStorage.user_id ? null : setCorrespondant(el);
    })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(/*{ behavior: "smooth", block:"end" }*/)
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
      <div className="content conversation-page">
        <div className='messages-list'>
        {
          messages.map((el) => {
            if (el.author._id === localStorage.user_id) {
              return (
                <MessageSingle key={el.id} content={el.content} file={el.file} timestamp={el.timestampFormatted} author={'own'} />
              )
            } else {
              return (
                <MessageSingle key={el._id} content={el.content} file={el.file} timestamp={el.timestampFormatted} author={'other'} conv_id={id} />
            )
            }
          })
        }
        </div>
        <div className="content-end" ref={messagesEndRef}></div>
      </div>
      <MessageInputField conversationID={id} groupID={undefined} />
    </Layout>
  )
}