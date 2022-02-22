import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'
import {
  selectEmail,
  selectLoginAsync,
  selectSignUpAsync,
} from 'store/auth/auth.selector'

import Input from 'components/input/input'
import { FirebaseErrorCode, WarningText } from 'constants/auth'
import { checkEmailFormat } from 'utils'

const Email = () => {
  const dispatch = useDispatch()
  const email = useSelector(selectEmail)
  const { error: loginError } = useSelector(selectLoginAsync)
  const { error: signUpError } = useSelector(selectSignUpAsync)

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    dispatch(authActions.setEmail(value))
  }

  const showErrorText = () => {
    if (!email) {
      return WarningText.required
    } else if (!checkEmailFormat(email)) {
      return '이메일 형식이 올바르지 않습니다.'
    } else if (loginError?.code === FirebaseErrorCode.notFoundUser) {
      return '가입되지 않은 회원입니다.'
    } else if (signUpError?.code === FirebaseErrorCode.existUser) {
      return '가입되어있는 회원입니다.'
    }
  }

  return (
    <Input
      type="text"
      placeholder="이메일을 적어주세요"
      label="이메일"
      value={email}
      onChange={changeEmail}
      errorText={showErrorText() || ''}
    />
  )
}

export default React.memo(Email)
