import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, {
  InputHTMLAttributes,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorText?: string
  label?: string
  labelDesc?: string
  leftChildren?: ReactElement
  rightChildren?: ReactElement
  rightNowWarning?: boolean
}

const Input = (props: InputProps) => {
  const {
    id,
    label,
    errorText,
    labelDesc,
    leftChildren,
    rightChildren,
    rightNowWarning,
  } = props
  const [blur, setBlur] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isInvalid = blur && !!errorText

  useEffect(() => {
    if (!!errorText && rightNowWarning) {
      setBlur(true)
    }
  }, [errorText, rightNowWarning])

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <InputWrapper>
      <Label htmlFor={id} warning={isInvalid}>
        {label}
      </Label>
      {!!labelDesc && <LabelDesc>{labelDesc}</LabelDesc>}
      <InputBox onClick={focusInput} warning={isInvalid}>
        {leftChildren}
        <RealInput
          {...props}
          ref={inputRef}
          id={id}
          onBlur={() => setBlur(true)}
          onFocus={() => setBlur(false)}
        />
        {rightChildren}
      </InputBox>
      {isInvalid && <ErrorText>{errorText}</ErrorText>}
    </InputWrapper>
  )
}

export default React.memo(Input)

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label<{ warning: boolean }>`
  margin-bottom: 6px;
  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme, warning }) =>
    warning ? theme.colors.WARNING : theme.colors.BLACK_2};
`

const LabelDesc = styled.span`
  margin-bottom: 6px;
  ${({ theme }) => theme.fonts.BODY_4};
  color: ${({ theme }) => theme.colors.GREY_6};
`

export const InputBox = styled.div<{ warning: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 48px;
  padding: 12px;
  border-radius: 4px;
  cursor: text;

  ${({ theme, warning }) =>
    warning
      ? css`
          border: 1px solid ${theme.colors.WARNING};
          box-shadow: 0 0 0 3px rgb(255 119 119 / 30%);
        `
      : css`
          border: 1px solid ${theme.colors.GREY_5};
          &:focus-within {
            border: 1px solid ${theme.colors.MAIN_1};
            box-shadow: 0 0 0 3px rgb(227 183 160 / 45%);
          }
        `}
`

const RealInput = styled.input`
  width: 100%;
  border: none;

  &::placeholder {
    ${({ theme }) => theme.fonts.BODY_2};
    color: ${({ theme }) => theme.colors.BLACK_1};
  }
`
const ErrorText = styled.span`
  margin-top: 7px;
  ${({ theme }) => theme.fonts.BODY_5};
  color: ${({ theme }) => theme.colors.WARNING};
`
