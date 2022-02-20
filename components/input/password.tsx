import styled from '@emotion/styled'
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'
import { selectLoginAsync, selectPassword } from 'store/auth/auth.selector'

import Input, { InputBox } from 'components/input/input'
import { FirebaseErrorCode, WarningText } from 'constants/auth'
import { checkPasswordFormat } from 'utils'

const Password = () => {
  const dispatch = useDispatch()
  const password = useSelector(selectPassword)
  const { error } = useSelector(selectLoginAsync)
  const [showPassword, setShowPassword] = useState(false)

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    dispatch(authActions.setPassword(value))
  }

  const clickShowPasswordButton = () => {
    setShowPassword((prev) => !prev)
  }

  const showErrorText = () => {
    if (!password) {
      return WarningText.required
    } else if (!checkPasswordFormat(password)) {
      return '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.'
    } else if (error?.code === FirebaseErrorCode.invalidPassword) {
      return '잘못된 비밀번호입니다.'
    } else if (error?.code === FirebaseErrorCode.notFoundUser) {
      return '가입되지 않은 정보입니다.'
    } else if (error) {
      return '알 수 없는 오류가 발생했습니다. 잠시후에 다시 시도해주세요.'
    }
  }

  return (
    <Wrapper>
      <Input
        label="비밀번호"
        labelDesc="영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요."
        type={showPassword ? 'text' : 'password'}
        placeholder="비밀번호를 적어주세요"
        value={password}
        onChange={changePassword}
        errorText={showErrorText() || ''}
        rightChildren={
          <ShowPasswodButton onClick={clickShowPasswordButton}>
            {showPassword ? '숨김' : '표시'}
          </ShowPasswodButton>
        }
      />
    </Wrapper>
  )
}

export default React.memo(Password)

const Wrapper = styled.div`
  width: 100%;

  ${InputBox} {
    position: relative;
  }
`

const ShowPasswodButton = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 3px;
  ${({ theme }) => theme.fonts.BODY_4};
  color: ${({ theme }) => theme.colors.MAIN_1};
  cursor: pointer;
`
