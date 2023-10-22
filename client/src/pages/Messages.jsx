import { useState, useEffect } from "react"
import { Layout } from "../components/Layout"
import { MessageOverview } from "../components/MessageOverview";

export const MessagesPage = () => {
  const [messages, setMessages] = useState();

  const fetchMessages = async () => {
    const req = await fetch('http://localhost:3000/conversation/' + localStorage.user_id);
    const res = await req.json()
    setMessages(res);
  }

  const messagesList = (messages) => {
    return(
      <>
        {
          messages.map((el) => {
            return (
              <MessageOverview key={el._id} message={el} />
            )
          })
        }
      </>
    )
    
  }

  useEffect(() => {
    fetchMessages();
  }, [])

  if (!messages) {
    return (
      <>
      <Layout>
        <h2>Messages</h2>
        <div>No messages</div>
      </Layout>
    </>
    )
  }

  return (
    <>
      <Layout>
        <div className="messages-list">
          {messagesList(messages)}
        </div>
      </Layout>
    </>
  )
}