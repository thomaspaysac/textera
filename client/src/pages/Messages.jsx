import { useState, useEffect } from "react"
import { Layout } from "../components/Layout"
import { MessageOverview } from "../components/MessageOverview";

export const MessagesPage = () => {
  const [conversations, setConversations] = useState();

  const fetchConversations = async () => {
    // http://localhost:3000/conversation/user/
    const req = await fetch('https://textera-production.up.railway.app/conversation/user/' + localStorage.user_id);
    const res = await req.json()
    setConversations(res);
  }

  const conversationsList = () => {
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
        <div className="content conversation-list">
          {conversationsList()}
        </div>
      </Layout>
    </>
  )
}