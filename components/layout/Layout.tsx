import { css } from '@emotion/react'
import styled from '@emotion/styled'
import SearchNav from 'components/nav/search-nav'
import Navigation from 'components/nav/navigation'
import { deviceSizes } from 'constants/common'
import Head from 'next/head'
import { ReactNode } from 'react'
import Frame from './frame'

interface LayoutProps {
  title?: string
  children: ReactNode
  isFitScreen?: boolean
  isNav?: boolean
}

const Layout = ({
  children,
  title,
  isFitScreen = false,
  isNav = true,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>펫프렌즈{!!title && `-${title}`}</title>
      </Head>

      <LayoutContainer isFitScreen={isFitScreen}>
        {isNav && (
          <Header>
            <SearchNav />
            <Navigation />
          </Header>
        )}

        <Frame>{children}</Frame>

        {/* TODO: bottomNav 만들기 */}
      </LayoutContainer>
    </>
  )
}

export default Layout

const LayoutContainer = styled.div<{ isFitScreen?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ isFitScreen }) =>
    isFitScreen
      ? css`
          height: 100%;
        `
      : css`
          min-height: max-content;
          height: 100vh;
        `}
  background-color: ${({ theme }) => theme.colors.GREY_4};
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${deviceSizes.MAX_SIZE}px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.WHITE};
`
