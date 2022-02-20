import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Navigation from 'components/nav/navigation'
import Head from 'next/head'
import { Fragment, ReactNode } from 'react'
import Frame from './frame'

interface LayoutProps {
  title?: string
  children: ReactNode
  isFullScreen?: boolean
}

const Layout = ({ children, title, isFullScreen = false }: LayoutProps) => {
  return (
    <Fragment>
      <Head>
        <title>펫프렌즈{!!title && `-${title}`}</title>
      </Head>

      <Body isFullScreen={isFullScreen}>
        <Navigation />
        <Frame>{children}</Frame>
      </Body>

      <div id="modal-container"></div>
      <div id="toast-container"></div>
    </Fragment>
  )
}

export default Layout

const Body = styled.div<{ isFullScreen?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ isFullScreen }) =>
    isFullScreen
      ? css`
          min-height: 100%;
        `
      : css`
          height: 100%;
        `}
  background-color: ${({ theme }) => theme.colors.GREY_4};
`
