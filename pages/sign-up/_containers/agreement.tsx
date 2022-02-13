import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Label } from 'components/input/input'
import { TERMS_AGREEMENTS } from 'constants/auth'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTermsAgreements } from 'store/auth/auth.selector'
import { authActions } from 'store/auth/auth.slice'
import { TermsAgreement } from 'store/auth/auth.type'
import Checkbox from 'components/checkbox/checkbox'

//TODO: 전체동의체크박스
const Agreement = () => {
  const dispatch = useDispatch()
  const termsAgreements = useSelector(selectTermsAgreements)

  const changeTermsAgreement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target

    dispatch(
      authActions.updateTermsAgreements({
        field: id as TermsAgreement['field'],
        agree: checked,
        updated: new Date().getTime(),
      })
    )
  }

  return (
    <Wrapper>
      <Label warning={true}>약관동의</Label>

      <CheckboxContainer>
        {TERMS_AGREEMENTS.map((agreement) => (
          <Checkbox
            key={agreement.field}
            id={agreement.field}
            onChange={changeTermsAgreement}
            checked={
              termsAgreements.find((ta) => ta.field === agreement.field)
                ?.agree || false
            }
            warning={true}
          >
            <CheckboxDesc>{agreement.desc}</CheckboxDesc>
            <RequiredText required={agreement.required}>
              ({agreement.required ? '필수' : '선택'})
            </RequiredText>
          </Checkbox>
        ))}
      </CheckboxContainer>
      {true && <RequiredWarningText>필수 동의 항목입니다.</RequiredWarningText>}
    </Wrapper>
  )
}

export default Agreement

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

const CheckboxDesc = styled.span`
  color: ${({ theme }) => theme.colors.BLACK_3};
  ${({ theme }) => theme.fonts.BODY_2};
  margin-left: 5px;
`
const RequiredText = styled.span<{ required: boolean }>`
  color: ${({ theme, required }) =>
    required ? theme.colors.MAIN_1 : theme.colors.GREY_5};
  ${({ theme }) => theme.fonts.BODY_5};
  margin-left: 5px;
`

const RequiredWarningText = styled.span`
  color: ${({ theme }) => theme.colors.WARNING};
  ${({ theme }) => theme.fonts.BODY_4};
  margin-top: 10px;
`
