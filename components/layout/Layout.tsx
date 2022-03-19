import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { MenuList } from 'components/nav/dropdown-menu'
import SearchNav from 'components/nav/search-nav'
import Navigation from 'components/nav/navigation'
import { pageNames } from 'constants/common'
import Head from 'next/head'
import { ReactNode } from 'react'
import Frame from './frame'

interface LayoutProps {
  title?: string
  children: ReactNode
  isFullScreen?: boolean
}

const MenuData: MenuList[] = [
  {
    name: '홈',
    url: pageNames.HOME,
  },
  {
    name: '요리수업',
    url: pageNames.CLASS,
  },
  {
    name: '상품',
    url: pageNames.SHOP,
  },
  {
    name: '장바구니',
    url: pageNames.MY,
  },
]

const Layout = ({ children, title, isFullScreen = false }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>펫프렌즈{!!title && `-${title}`}</title>
      </Head>

      <Body isFullScreen={isFullScreen}>
        <SearchNav />
        <Navigation menuList={MenuData} />

        <Frame>{children}</Frame>

        {/* TODO: bottomNav 만들기 */}
      </Body>
    </>
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
