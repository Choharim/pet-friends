import React, { useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'

import { TERMS_AGREEMENTS } from 'constants/auth'
import { selectTermsAgreements } from 'store/auth/auth.selector'
import { authActions } from 'store/auth/auth.slice'
import { TermsAgreement } from 'store/auth/auth.type'

import { Label } from 'components/input/input'
import Checkbox from 'components/checkbox/checkbox'

const ALL_AGREE_CHECKBOX_ID = 'all-agreements'

const Agreement = () => {
  const dispatch = useDispatch()
  const termsAgreements = useSelector(selectTermsAgreements)
  const [blurCheckbox, setBlurCheckbox] = useState(false)

  const changeTermsAgreement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target

    if (TERMS_AGREEMENTS.find((taData) => taData.field === id)?.required) {
      if (checked) {
        setBlurCheckbox(false)
      } else {
        setBlurCheckbox(true)
      }
    }

    dispatch(
      authActions.updateTermsAgreements({
        field: id as TermsAgreement['field'],
        agree: checked,
      })
    )
  }

  const changeAllTermsAgreement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    if (checked) {
      dispatch(authActions.setTermsAgreements(true))
      setBlurCheckbox(false)
    } else {
      dispatch(authActions.setTermsAgreements(false))
      setBlurCheckbox(true)
    }
  }

  const wraning =
    termsAgreements.some(
      (ta) =>
        TERMS_AGREEMENTS.find((taData) => taData.field === ta.field)
          ?.required && !ta.agree
    ) && blurCheckbox

  return (
    <Wrapper>
      <Label warning={wraning}>약관동의</Label>

      <CheckboxContainer>
        <Checkbox
          id={ALL_AGREE_CHECKBOX_ID}
          onChange={changeAllTermsAgreement}
          checked={termsAgreements.every((ta) => ta.agree)}
        >
          <CheckboxDesc all>전체동의</CheckboxDesc>
        </Checkbox>

        {TERMS_AGREEMENTS.map((agreement) => (
          <Checkbox
            key={agreement.field}
            id={agreement.field}
            onChange={changeTermsAgreement}
            checked={
              termsAgreements.find((ta) => ta.field === agreement.field)
                ?.agree || false
            }
            warning={wraning && agreement.required}
          >
            <CheckboxDesc>{agreement.desc}</CheckboxDesc>
            <RequiredText required={agreement.required}>
              ({agreement.required ? '필수' : '선택'})
            </RequiredText>
          </Checkbox>
        ))}
      </CheckboxContainer>
      {wraning && (
        <RequiredWarningText>필수 동의 항목입니다.</RequiredWarningText>
      )}
    </Wrapper>
  )
}

export default React.memo(Agreement)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.GREY_5};
  border-radius: 4px;
`

const CheckboxDesc = styled.span<{ all?: boolean }>`
  color: ${({ theme }) => theme.colors.BLACK_3};
  ${({ theme }) => theme.fonts.BODY_2};
  margin-left: 5px;

  ${({ all, theme }) =>
    all &&
    css`
      ${theme.fonts.BODY_1};
    `}
`
const RequiredText = styled.span<{ required: boolean }>`
  color: ${({ theme, required }) =>
    required ? theme.colors.MAIN_6 : theme.colors.GREY_5};
  ${({ theme }) => theme.fonts.BODY_5};
  margin-left: 5px;
`

const RequiredWarningText = styled.span`
  color: ${({ theme }) => theme.colors.WARNING};
  ${({ theme }) => theme.fonts.BODY_4};
  margin-top: 10px;
`
