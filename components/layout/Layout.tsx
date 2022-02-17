import styled from '@emotion/styled'
import Navigation from 'components/nav/navigation'
import { deviceSizes } from 'constants/common'
import Head from 'next/head'
import { ReactNode } from 'react'

interface LayoutProps {
  title?: string
  children: ReactNode
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>펫프렌즈{!!title && `-${title}`}</title>
      </Head>
      <Body>
        <Navigation />
        {children}
      </Body>
      <footer></footer>
      <div id="modal-container"></div>
      <div id="toast-container"></div>
    </LayoutWrapper>
  )
}

export default Layout

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.GREY_4};
`
const Body = styled.div`
  max-width: ${deviceSizes.MIN_TABLET_SIZE}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.WHITE};
`
