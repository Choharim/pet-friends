import styled from '@emotion/styled'
import Layout from 'components/layout/layout'
import { ICON_CDN_URL, pageNames } from 'constants/common'
import { useRouter } from 'next/router'
import React from 'react'
import Email from 'components/input/email'
import Password from 'components/input/password'
import ResetPasswordAndSignUp from './_containers/find-password-and-sign-up'

const Login = () => {
  const router = useRouter()

  const goToHome = () => {
    router.push(pageNames.HOME)
  }
  //TODO: 이메일,비밀번호 모두 유효하면 로그인
  return (
    <Layout title="로그인" isFullScreen>
      <Wrapper>
        <LoginIcon
          onClick={goToHome}
          src={`${ICON_CDN_URL}/512/6597/6597983.png`}
          alt="login_icon"
        />
        <PageTitle>로그인</PageTitle>
        <LoginForm>
          <Email />
          <Password />
        </LoginForm>
        <LoginButton>이메일 로그인</LoginButton>
        <ResetPasswordAndSignUp />
      </Wrapper>
    </Layout>
  )
}

export default Login

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
  padding: 100px 0 30px;
  margin: 0 auto;
`

const PageTitle = styled.h2`
  ${({ theme }) => theme.fonts.HEADER_2};
  color: ${({ theme }) => theme.colors.BLACK_3};
  margin: 30px 0;
`

const LoginIcon = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`
const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  margin: 40px 0 20px;
  background-color: ${({ theme }) => theme.colors.MAIN_2};
  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme }) => theme.colors.WHITE};

  cursor: pointer;
  border-radius: 4px;
  outline: none;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.MAIN_1};
  }
`
