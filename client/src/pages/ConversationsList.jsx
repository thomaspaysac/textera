import { useState, useEffect, useContext } from "react"
import { userContext } from "../App";
import { Layout } from "../components/Layout"
import { ConversationOverview } from "../components/ConversationOverview";
import { NewConvButton } from "../components/NewConvButton";

export const ConversationsList = () => {
  const [conversations, setConversations] = useState();
  const userData = useContext(userContext);

  const fetchConversations = async () => {
    if (!userData) {
      return;
    } else {
      const req = await fetch('http://localhost:3000/conversation/user/' + userData.user_metadata.uid, {
        headers: {
          "Authorization": userData.user_metadata.uid,
        }
      });
      //const req = await fetch('https://textera-production.up.railway.app/conversation/user/' + localStorage.user_id);
      const res = await req.json()
      setConversations(res);
    }
  }

  const conversationsList = () => {
    return(
      <>
        {
          conversations.map((el) => {
            return (
              <ConversationOverview key={el._id} message={el} />
            )
          })
        }
      </>
    )
  }

  useEffect(() => {
    fetchConversations();
  }, [userData])

  if (!conversations || !conversations.length) {
    return (
      <>
      <Layout>
        <h2>Conversations</h2>
        <div>No conversations</div>
        <NewConvButton link={'/contacts'} />
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
        <NewConvButton link={'/contacts'} />
      </Layout>
    </>
  )
}