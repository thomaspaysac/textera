import Header from "./Header"
import { Footer } from "./Footer"

export const Layout = (props) => {
  return (
    <>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </>
  )
}