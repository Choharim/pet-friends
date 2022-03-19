import styled from '@emotion/styled'
import { MenuList } from 'components/nav/dropdown-menu'
import { deviceSizes } from 'constants/common'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

type NavigationProps = {
  menuList: MenuList[]
}

const Navigation = ({ menuList }: NavigationProps) => {
  const router = useRouter()
  const [activeMenuWidth, setActiveMenuWidth] = useState(0)
  const [activeMenuLeft, setActiveMenuLeft] = useState(0)
  const firstActiveMenu = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!firstActiveMenu.current) return

    const targetedMenu = firstActiveMenu.current
    setActiveMenuWidth(targetedMenu.offsetWidth)
    setActiveMenuLeft(targetedMenu.offsetLeft)
  }, [firstActiveMenu, router.asPath])

  const clickMenu = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!e.currentTarget) return

    const targetedMenu = e.currentTarget

    setActiveMenuWidth(targetedMenu.offsetWidth)
    setActiveMenuLeft(targetedMenu.offsetLeft)
  }

  return (
    <NavBox>
      <NavContainer>
        {menuList.map((menu) => (
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
      </NavContainer>
    </NavBox>
  )
}

export default Navigation

const NavBox = styled.nav`
  height: 50px;
  width: 100%;
  max-width: ${deviceSizes.MAX_SIZE}px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_2};
`

const NavContainer = styled.ul`
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
    padding: 0 10px;
    line-height: 50px;
  }
`

const Bar = styled.div<{ width: number; left: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  bottom: 0;
  height: 4px;
  width: ${({ width }) => width}px;
  background-color: ${({ theme }) => theme.colors.MAIN_6};
  transition: 0.2s;
`
