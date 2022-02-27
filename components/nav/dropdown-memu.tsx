import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { ICON_CDN_URL, pageNames } from 'constants/common'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectNickName, selectProfileUrl } from 'store/auth/auth.selector'
import { authActions } from 'store/auth/auth.slice'

type MenuList = {
  name: string
  url: typeof pageNames[keyof typeof pageNames]
}

const MenuList: MenuList[] = [
  {
    name: '마이페이지',
    url: pageNames.MY_PAGE,
  },
  {
    name: '내 수업',
    url: pageNames.MY_CLASS,
  },
  {
    name: '내 주문',
    url: pageNames.MY_SHOP,
  },
]

const DropdownMemu = () => {
  const dispatch = useDispatch()
  const nickName = useSelector(selectNickName)
  const profileUrl = useSelector(selectProfileUrl)
  const [open, setOpen] = useState(false)
  const dropdownBoxRef = useRef<HTMLDivElement>(null)
  const dropdownHeaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeDropdownIfClickedOutside = (e: MouseEvent) => {
      if (
        dropdownHeaderRef.current &&
        dropdownBoxRef.current &&
        !dropdownHeaderRef.current.contains(e.target as Node) &&
        !dropdownBoxRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', closeDropdownIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', closeDropdownIfClickedOutside)
    }
  }, [dropdownBoxRef, dropdownHeaderRef])

  const toggleDropdown = () => {
    setOpen((prev) => !prev)
  }

  const logout = () => {
    dispatch(authActions.logoutStart())
  }

  return (
    <DropdownHeaderWrapper ref={dropdownHeaderRef} onClick={toggleDropdown}>
      <ProfileImg
        src={profileUrl || `${ICON_CDN_URL}/512/848/848006.png`}
        alt="user-profile"
      />
      <DropdownArrowIcon
        src={`${ICON_CDN_URL}/512/892/892528.png`}
        alt="user-profile_dropdown-arrow"
        open={open}
      />
      <DropdownBox ref={dropdownBoxRef} open={open}>
        <MenuContainer>
          <UserNickName>{nickName} 주인님</UserNickName>
          {MenuList.map((menu) => (
            <MenuWrapper key={`${menu.name}_in_dropdown-menu`}>
              <Link href={menu.url}>
                <a>{menu.name}</a>
              </Link>
            </MenuWrapper>
          ))}
        </MenuContainer>
        <Logout onClick={logout}>로그아웃</Logout>
      </DropdownBox>
    </DropdownHeaderWrapper>
  )
}

export default DropdownMemu

const DropdownHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border: 50%;
  margin-right: 10px;
`
const DropdownArrowIcon = styled.img<{ open: boolean }>`
  width: 12px;
  height: 12px;
  transform: rotate(90deg);

  ${({ open }) =>
    open &&
    css`
      transform: rotate(-90deg);
    `}
`

const DropdownBox = styled.div<{ open: boolean }>`
  position: absolute;
  top: 40px;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 200px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0 0 0.625rem 0 rgb(0 0 0 / 10%);

  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}
`
const UserNickName = styled.span`
  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme }) => theme.colors.BLACK_3};

  display: block;
  width: 100%;
  margin-bottom: 20px;
`
const MenuContainer = styled.ul`
  padding: 15px 15px 0;
`

const MenuWrapper = styled.li`
  text-align: center;
  ${({ theme }) => theme.fonts.BODY_3};
  color: ${({ theme }) => theme.colors.BLACK_5};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_2};
    margin-bottom: 12px;
  }
  a {
    display: block;
    width: 100%;
    padding: 12px 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_1};
  }
`

const Logout = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 0 0 4px 4px;

  ${({ theme }) => theme.fonts.BODY_4};
  color: ${({ theme }) => theme.colors.BLACK_1};

  background-color: ${({ theme }) => theme.colors.GREY_2};

  &:hover {
    color: ${({ theme }) => theme.colors.BLACK_4};
  }
`
