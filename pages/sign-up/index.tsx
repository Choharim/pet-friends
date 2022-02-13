import styled from '@emotion/styled'
import Email from 'components/input/email'
import Password from 'components/input/password'
import Layout from 'components/layout/layout'
import React from 'react'
import Agreement from './_containers/agreement'
import NickName from './_containers/nick-name'

const SignUp = () => {
  return (
    <Layout title="회원가입">
      <Wrapper>
        <PageTitle>회원가입</PageTitle>
        <SignUpForm>
          <Email />
          <Password />
          <NickName />
          <Agreement />
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
  height: 100%;
  padding-top: 100px;
  margin: 0 auto;
`

const PageTitle = styled.h2`
  ${({ theme }) => theme.fonts.HEADER_2};
  color: ${({ theme }) => theme.colors.BLACK_3};
  margin: 30px 0;
`
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`
