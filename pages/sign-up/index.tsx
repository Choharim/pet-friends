import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { authActions } from 'store/auth/auth.slice'

import Layout from 'components/layout/layout'
import Email from 'components/input/email'
import Password from 'components/input/password'
import Agreement from './_containers/agreement'
import Confirm from './_containers/confirm'
import NickName from './_containers/nick-name'

const SignUp = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(authActions.clearSignUp())
    }
  }, [dispatch])

  return (
    <Layout title="회원가입">
      <Wrapper>
        <PageTitle>회원가입</PageTitle>
        <SignUpForm>
          <Email />
          <Password />
          <NickName />
          <Agreement />
          <Confirm />
        </SignUpForm>
      </Wrapper>
    </Layout>
  )
}

export default SignUp

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 390px;
  margin: 0 auto;
`

const PageTitle = styled.h2`
  ${({ theme }) => theme.fonts.HEADER_3};
  color: ${({ theme }) => theme.colors.BLACK_3};
  margin: 30px 0;
`
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`
