import { useState, useEffect } from "react"
import { Layout } from "../components/Layout"
import { MessageOverview } from "../components/MessageOverview";

export const MessagesPage = () => {
  const [conversations, setConversations] = useState();

  const fetchConversations = async () => {
    const req = await fetch('http://localhost:3000/conversation/' + localStorage.user_id);
    const res = await req.json()
    setConversations(res);
  }

  const conversationsList = (conversations) => {
    return(
      <>
        {
          conversations.map((el) => {
            return (
              <MessageOverview key={el._id} message={el} />
            )
          })
        }
      </>
    )
    
  }

  useEffect(() => {
    fetchConversations();
  }, [])

  if (!conversations) {
    return (
      <>
      <Layout>
        <h2>Conversations</h2>
        <div>No conversations</div>
      </Layout>
    </>
    )
  }

  return (
    <>
      <Layout>
        <div className="conversation-list">
          {conversationsList(conversations)}
        </div>
      </Layout>
    </>
  )
}