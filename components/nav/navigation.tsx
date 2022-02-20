import styled from '@emotion/styled'
import {
  deviceSizes,
  ICON_CDN_URL,
  NAVIGATION_HEIGHT,
  pageNames,
} from 'constants/common'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLogin } from 'store/auth/auth.selector'

const Navigation = () => {
  const router = useRouter()
  const isLogin = useSelector(selectIsLogin)

  const goToHome = () => {
    router.push(pageNames.HOME)
  }

  const goToLogin = () => {
    router.push(pageNames.LOGIN)
  }

  return (
    <NavBox>
      <Logo>
        <LogoImg
          src={`${ICON_CDN_URL}/512/1279/1279250.png`}
          alt="navigation-logo-img"
        />
        <LogoText onClick={goToHome}>pet friends</LogoText>
      </Logo>
      {/**
       * TODO: user profile component 생성
       */}
      {isLogin ? null : <LoginButton onClick={goToLogin}>로그인</LoginButton>}
    </NavBox>
  )
}

export default React.memo(Navigation)

const NavBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: ${NAVIGATION_HEIGHT};
  width: 100%;
  max-width: ${deviceSizes.MIN_TABLET_SIZE}px;
  margin: 0 auto;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_2};
`
// const Navbars = styled.img`
//   width: 24px;
//   height: 24px;
//   padding: 4px;

//   cursor: pointer;
// `
const Logo = styled.div`
  display: flex;
  align-items: flex-end;
`

const LogoText = styled.span`
  font-family: 'Permanent Marker', cursive;
  margin-left: 15px;

  ${({ theme }) => theme.fonts.HEADER_2};
  color: ${({ theme }) => theme.colors.MAIN_1};
  cursor: pointer;
`

const LogoImg = styled.img`
  width: 32px;
  height: 32px;
`

const LoginButton = styled.span`
  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme }) => theme.colors.MAIN_2};
  padding: 7px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_1};
  }
`
