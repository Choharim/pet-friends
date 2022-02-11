import styled from '@emotion/styled'
import Layout from 'components/layout/layout'
import { ICON_CDN_URL, pageNames } from 'constants/common'
import { useRouter } from 'next/router'
import React from 'react'
import Email from './_containers/email'
import Password from './_containers/password'
import ResetPasswordAndSignUp from './_containers/find-password-and-sign-up'

const Login = () => {
  const router = useRouter()

  const goToHome = () => {
    router.push(pageNames.HOME)
  }

  return (
    <Layout title="로그인">
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
  height: 100%;
  padding-top: 100px;
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
