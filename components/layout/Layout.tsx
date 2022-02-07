import Head from 'next/head'
import { ReactElement } from 'react'

interface LayoutProps {
  title?: string
  children: ReactElement
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>펫프렌즈{!!title && `-${title}`}</title>
      </Head>
      <nav></nav>
      {children}
      <div id="modal-container"></div>
      <div id="toast-container"></div>
      <footer></footer>
    </div>
  )
}

export default Layout
