import styled from '@emotion/styled'
import { deviceSizes } from 'constants/common'
import Head from 'next/head'
import { ReactElement } from 'react'
import { theme } from 'theme'

interface LayoutProps {
  title?: string
  children: ReactElement
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Head>
        <title>펫프렌즈{!!title && `-${title}`}</title>
      </Head>
      <nav></nav>
      <Body>{children}</Body>
      <footer></footer>
      <div id="modal-container"></div>
      <div id="toast-container"></div>
    </LayoutContainer>
  )
}

export default Layout

const LayoutContainer = styled.div`
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
