import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { authActions } from 'store/auth/auth.slice'
import {
  selectEmail,
  selectLoginAsync,
  selectPassword,
} from 'store/auth/auth.selector'
import { checkEmailFormat, checkPasswordFormat } from 'utils/regex'

import Button from 'components/button/button'
import CircleSpiner from 'components/spiner/circle-spiner'

const Confirm = () => {
  const dispatch = useDispatch()
  const email = useSelector(selectEmail)
  const password = useSelector(selectPassword)
  const { loading } = useSelector(selectLoginAsync)

  const goToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!checkEmailFormat(email) || !checkPasswordFormat(password)) {
      return
    }

    dispatch(authActions.loginStart())
  }

  return (
    <LoginButton themeColor="MAIN_5" onClick={goToLogin}>
      이메일 로그인
      {loading && <CircleSpiner />}
    </LoginButton>
  )
}

export default React.memo(Confirm)

const LoginButton = styled(Button)`
  margin: 40px 0 20px;
`
