import styled from '@emotion/styled'
import { ICON_CDN_URL, NAVIGATION_HEIGHT, pageNames } from 'constants/common'
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

  return (
    <NavContainer>
      <Navbars
        src={`${ICON_CDN_URL}/512/545/545705.png`}
        alt="navigation_bars"
      />
      <LogoWrapper>
        <LogoText onClick={goToHome}>pet friends</LogoText>
        <LogoImg
          src="https://cdn-icons.flaticon.com/png/512/3629/premium/3629576.png?token=exp=1644589329~hmac=a731cfb34156cf97adc94289c37edd7e"
          alt="navigation-logo-img"
        />
      </LogoWrapper>
      {/**
       * TODO: user profile component 생성
       */}
      {isLogin ? null : <LoginButton>로그인</LoginButton>}
    </NavContainer>
  )
}

export default Navigation

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${NAVIGATION_HEIGHT};
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_2};
`
const Navbars = styled.img`
  width: 24px;
  height: 24px;
  padding: 4px;

  cursor: pointer;
`
const LogoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const LogoText = styled.span`
  font-family: 'Black Han Sans', sans-serif;
  font-family: 'Do Hyeon', sans-serif;
  font-family: 'Nanum Gothic', sans-serif;
  font-family: 'Permanent Marker', cursive;

  ${({ theme }) => theme.fonts.HEADER_2};
  color: ${({ theme }) => theme.colors.MAIN_1};
  cursor: pointer;
`

const LogoImg = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 12px;
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
