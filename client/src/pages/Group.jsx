import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout";
import { ConversationHeader } from "../components/ConversationHeader";
import { MessageInputField } from "../components/MessageInputField";
import { MessageSingle } from "../components/MessageSingle";

export const Group = () => {
  const [messages, setMessages] = useState();
  const [groupInfo, setGroupInfo] = useState();
  const [user, setUser] = useState();
  const { id } = useParams();
  const messagesEndRef = useRef(null)

  const fetchGroup = async () => {
    // https://textera-production.up.railway.app/messages/conv/
    // Get all messages in group
    const req = await fetch('http://localhost:3000/messages/group/' + id);
    const res = await req.json();
    setMessages(res);
    // Get group data
    // https://textera-production.up.railway.app/conversation/
    const groupReq = await fetch('http://localhost:3000/group/' + id)
    const groupRes = await groupReq.json();
    setGroupInfo(groupRes);
    groupRes.users.forEach((el) => {
      return el._id !== localStorage.user_id ? null : setUser(el);
    })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(/*{ behavior: "smooth", block:"end" }*/)
  }

  useEffect(() => {
    fetchGroup();
  }, [])

  useEffect(() => {
    scrollToBottom();
  })

  if (!messages || !groupInfo) {
    return null;
  }

  return (
    <Layout>
      <ConversationHeader name={groupInfo.title} image={groupInfo.image} id={groupInfo._id} />
      <div className="content conversation-page">
        <div className='messages-list'>
        {
          messages.map((el) => {
            console.log(el.author)
            if (el.author._id === localStorage.user_id) {
              return (
                <MessageSingle key={el.id} group={true} content={el.content} file={el.file} timestamp={el.timestampFormatted} author={'own'} />
              )
            } else {
              return (
                <MessageSingle key={el._id} group={true} content={el.content} file={el.file} timestamp={el.timestampFormatted} author={'other'} username={el.author.username} avatar={el.author.avatar} />
            )
            }
          })
        }
        </div>
        <div className="content-end" ref={messagesEndRef}></div>
      </div>
      <MessageInputField groupID={id} conversationID={undefined} />
    </Layout>
  )
}