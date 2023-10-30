import { Layout } from "../components/Layout"

export const ErrorPage = ({ error }) => {
  return (
    <Layout>
      <div className="content error-page">Error: {error}</div>
    </Layout>
  )
}