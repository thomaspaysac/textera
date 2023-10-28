import Header from "./Header"
import { Footer } from "./Footer"

export const Layout = (props) => {
  return (
    <>
      <main>
        {props.children}
      </main>
    </>
  )
}