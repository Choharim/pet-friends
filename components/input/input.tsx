import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorText?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, label, errorText } = props
  const [blur, setBlur] = useState(false)

  const isInvalid = blur && !!errorText

  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <InputBox
        {...props}
        ref={ref}
        id={id}
        warning={isInvalid}
        onBlur={() => setBlur(true)}
      />
      {isInvalid && <ErrorText>{errorText}</ErrorText>}
    </InputWrapper>
  )
})

Input.displayName = 'Input'

export default React.memo(Input)

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 6px;
  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme }) => theme.colors.BLACK_2};
`

const InputBox = styled.input<{ warning: boolean }>`
  width: 100%;
  height: 48px;
  padding: 12px;
  border-radius: 4px;

  ${({ theme, warning }) =>
    warning
      ? css`
          border: 1px solid ${theme.colors.WARNING};
          box-shadow: 0 0 0 3px rgb(255 119 119 / 30%);
        `
      : css`
          border: 1px solid ${theme.colors.GREY_5};
          &:focus {
            border: 1px solid ${theme.colors.MAIN_1};
            box-shadow: 0 0 0 3px rgb(227 183 160 / 45%);
          }
        `}

  &::placeholder {
    ${({ theme }) => theme.fonts.BODY_1};
    color: ${({ theme }) => theme.colors.BLACK_1};
  }
`
const ErrorText = styled.span`
  margin-top: 7px;
  ${({ theme }) => theme.fonts.BODY_5};
  color: ${({ theme }) => theme.colors.WARNING};
`
