import { useLocation } from "react-router-dom"

import { Layout } from "../components/Layout"

export const ChangeStatusPage = () => {
  const location = useLocation()
  const { user } = location.state
  
  return (
    <Layout>
      <div className="content">
        CHANGE STATUS
      </div>
    </Layout>
  )
}