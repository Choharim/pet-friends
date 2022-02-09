import styled from '@emotion/styled'
import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'
import { selectEmail } from 'store/auth/auth.selector'

import Input from 'components/input/input'
import { WarningText } from 'constants/auth'
import { checkEmailFormat } from 'utils'

const Email = () => {
  const dispatch = useDispatch()
  const email = useSelector(selectEmail)

  useEffect(() => {
    //TODO: emailId + emailType
    dispatch(authActions.setEmail(email))
  }, [])

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    dispatch(authActions.setEmail(value))
  }

  const showErrorText = () => {
    if (!email) {
      return WarningText.required
    } else if (!checkEmailFormat(email)) {
      return '이메일 형식이 올바르지 않습니다.'
    }
  }

  return (
    <EmailSectionWrapper>
      <Input
        type="text"
        value={email}
        onChange={changeEmail}
        errorText={showErrorText()}
      />
      {/* <Select>
          <Option>

          </Option>
      </Select> */}
    </EmailSectionWrapper>
  )
}

export default Email

const EmailSectionWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
