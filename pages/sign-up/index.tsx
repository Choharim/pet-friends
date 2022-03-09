import styled from '@emotion/styled'
import Button from 'components/button/button'
import Email from 'components/input/email'
import Password from 'components/input/password'
import Layout from 'components/layout/layout'
import { TERMS_AGREEMENTS } from 'constants/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignUpData } from 'store/auth/auth.selector'
import { authActions } from 'store/auth/auth.slice'
import { uiActions } from 'store/ui/ui.slice'
import { ToastDescKey } from 'store/ui/ui.type'
import { checkEmailFormat, checkPasswordFormat } from 'utils'
import Agreement from './_containers/agreement'
import NickName from './_containers/nick-name'

const SignUp = () => {
  const dispatch = useDispatch()
  const { email, password, nickName, termsAgreements } =
    useSelector(selectSignUpData)

  useEffect(() => {
    return () => {
      dispatch(authActions.clearSignUp())
    }
  }, [dispatch])

  const goToSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (
      !checkEmailFormat(email) ||
      !checkPasswordFormat(password) ||
      nickName.trim().length < 2 ||
      termsAgreements.some(
        (ta) =>
          TERMS_AGREEMENTS.find((taData) => taData.field === ta.field)
            ?.required && !ta.agree
      )
    ) {
      dispatch(
        uiActions.showToast({
          descKey: ToastDescKey.allRequired,
          key: new Date().getTime(),
        })
      )

      return
    }

    dispatch(authActions.signUpStart())
  }

  return (
    <Layout title="회원가입">
      <Wrapper>
        <PageTitle>회원가입</PageTitle>
        <SignUpForm>
          <Email />
          <Password />
          <NickName />
          <Agreement />
          <Button themeColor="MAIN_5" onClick={goToSignUp}>
            회원가입하기
          </Button>
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
  padding: 60px 0 30px;
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
