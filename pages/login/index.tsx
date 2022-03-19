import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { authActions } from 'store/auth/auth.slice'

import Layout from 'components/layout/layout'
import Header from './_containers/header'
import Email from 'components/input/email'
import Password from 'components/input/password'
import Confirm from './_containers/confirm'
import ResetPasswordAndSignUp from './_containers/find-password-and-sign-up'

const Login = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(authActions.clearLogin())
    }
  }, [dispatch])

  return (
    <Layout title="로그인" isFitScreen>
      <Wrapper>
        <Header />
        <LoginForm>
          <Email />
          <Password />
          <Confirm />
        </LoginForm>
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
  margin: 0 auto;
`
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`
