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
  const [toggle, setToggle] = useState(false)
  const [blur, setBlur] = useState(false)

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    dispatch(authActions.setPassword(value))
  }

  const showPassword = () => {
    setToggle((prev) => !prev)
  }

  const showErrorText = () => {
    if (!blur) return

    if (!password) {
      return WarningText.required
    } else if (!checkPasswordFormat(password)) {
      return '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.'
    }
  }

  return (
    <Container>
      <Input
        label="비밀번호"
        type={toggle ? 'text' : 'password'}
        placeholder="비밀번호를 적어주세요"
        value={password}
        onChange={changePassword}
        errorText={showErrorText()}
        onBlur={() => setBlur(true)}
        onFocus={() => setBlur(false)}
      />
      <Text onClick={showPassword}>{toggle ? '표시' : '숨김'}</Text>
    </Container>
  )
}

export default Password

const Container = styled.div`
  position: relative;
  width: 100%;
`

const Text = styled.span`
  position: absolute;
  top: 42px;
  right: 12px;

  padding: 3px;
  ${({ theme }) => theme.fonts.BODY_4};
  color: ${({ theme }) => theme.colors.MAIN_1};
  cursor: pointer;
`
