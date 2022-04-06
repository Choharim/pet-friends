import styled from '@emotion/styled'
import { MenuList } from 'components/nav/dropdown-menu'
import { pageNames } from 'constants/common'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const MENU_LIST: MenuList[] = [
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
    name: '정기구독',
    url: pageNames.SUBSCRIPTION,
  },
  {
    name: '마이',
    url: pageNames.MY,
  },
]

const Navigation = () => {
  const router = useRouter()
  const [activeMenuWidth, setActiveMenuWidth] = useState(0)
  const [activeMenuLeft, setActiveMenuLeft] = useState(0)
  const firstActiveMenu = useRef<HTMLLIElement>(null)

  const setBarPosition = useCallback(() => {
    if (!firstActiveMenu.current) return

    const targetedMenu = firstActiveMenu.current
    setActiveMenuWidth(targetedMenu.offsetWidth)
    setActiveMenuLeft(targetedMenu.offsetLeft)
  }, [])

  useEffect(() => {
    setBarPosition()
  }, [router.asPath, setBarPosition])

  useEffect(() => {
    window.addEventListener('resize', setBarPosition)
    return () => {
      window.removeEventListener('resize', setBarPosition)
    }
  }, [setBarPosition])

  const clickMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!e.currentTarget) return

    const targetedMenu = e.currentTarget

    setActiveMenuWidth(targetedMenu.offsetWidth)
    setActiveMenuLeft(targetedMenu.offsetLeft)
  }

  return (
    <Nav>
      <MenuContainer>
        {MENU_LIST.map((menu) => (
          <MenuWrapper
            ref={menu?.url === router.asPath ? firstActiveMenu : null}
            key={`${menu.name}_in_myPage`}
            active={router.asPath === menu.url}
            onClick={clickMenu}
          >
            <Link href={menu.url}>
              <a>{menu.name}</a>
            </Link>
          </MenuWrapper>
        ))}
        <Bar width={activeMenuWidth} left={activeMenuLeft} />
      </MenuContainer>
    </Nav>
  )
}

export default React.memo(Navigation)

const Nav = styled.nav`
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_2};
`

const MenuContainer = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const MenuWrapper = styled.li<{ active: boolean }>`
  height: 100%;
  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme, active }) =>
    active ? theme.colors.MAIN_6 : theme.colors.BLACK_5};

  &:not(:last-child) {
    margin-right: 10px;
  }
  > a {
    display: block;
    padding: 0 15px;
    white-space: nowrap;
    line-height: 50px;
  }
`

const Bar = styled.div<{ width: number; left: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  bottom: 0;
  height: 2px;
  width: ${({ width }) => width}px;
  background-color: ${({ theme }) => theme.colors.MAIN_6};
  transition: 0.2s;
`
