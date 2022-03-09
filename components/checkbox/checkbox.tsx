import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { InputHTMLAttributes, ReactNode } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
  id: HTMLInputElement['id']
  checked: HTMLInputElement['checked']
  warning?: boolean
}

const Checkbox = (props: CheckboxProps) => {
  const { checked, children, id, warning = false, ...rest } = props

  return (
    <CheckboxLabelWrapper htmlFor={id}>
      <HiddenCheckbox type="checkbox" id={id} checked={checked} {...rest} />
      <CheckboxIcon checked={checked} warning={warning}>
        <svg width="1em" height="1em" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            d="M6.185 10.247l7.079-7.297 1.435 1.393-8.443 8.703L1.3 8.432l1.363-1.464z"
          ></path>
        </svg>
      </CheckboxIcon>
      {children}
    </CheckboxLabelWrapper>
  )
}

export default Checkbox

const CheckboxLabelWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const HiddenCheckbox = styled.input`
  display: none;
`
const CheckboxIcon = styled.span<{ checked: boolean; warning: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  border: 1px solid
    ${({ theme, warning }) =>
      warning ? theme.colors.WARNING : theme.colors.GREY_5};
  border-radius: 4px;

  ${({ theme, checked }) =>
    checked
      ? css`
          background-color: ${theme.colors.MAIN_6};
          > svg {
            color: ${theme.colors.WHITE};
          }
        `
      : css`
          background-color: transparent;
          > svg {
            color: transparent;
          }
        `};
`
