import styled from '@emotion/styled'
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'
import { selectPassword } from 'store/auth/auth.selector'

import Input from 'components/input/input'
import { WarningText } from 'constants/auth'
import { checkPasswordFormat } from 'utils'

const Password = () => {
  const dispatch = useDispatch()
  const password = useSelector(selectPassword)
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
      />
      <ShowPasswodButton onClick={clickShowPasswordButton}>
        {showPassword ? '숨김' : '표시'}
      </ShowPasswodButton>
    </Wrapper>
  )
}

export default Password

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const ShowPasswodButton = styled.span`
  position: absolute;
  bottom: 12px;
  right: 12px;

  padding: 3px;
  ${({ theme }) => theme.fonts.BODY_4};
  color: ${({ theme }) => theme.colors.MAIN_1};
  cursor: pointer;
`
