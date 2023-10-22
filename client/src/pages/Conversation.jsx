import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Layout } from "../components/Layout";

export const Conversation = () => {
  const [conversation, setConversation] = useState();

  const { id } = useParams();

  return (
    <Layout>
      {id}
    </Layout>
  )
}