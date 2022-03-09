import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { HTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  themeColor?: 'MAIN_5' | 'GREY_1' | 'WHITE'
  fitContents?: boolean
}
const Button = (props: ButtonProps) => {
  const { children, themeColor, fitContents = false, ...rest } = props

  return (
    <ButtonBox themeColor={themeColor} fitContents={fitContents} {...rest}>
      {children}
    </ButtonBox>
  )
}

export default Button

export const ButtonBox = styled.button<{
  themeColor: ButtonProps['themeColor']
  fitContents: ButtonProps['fitContents']
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.SUB_TITLE_4};

  ${({ fitContents }) =>
    !fitContents &&
    css`
      width: 100%;
      height: 48px;
    `}

  ${({ theme, themeColor }) => {
    switch (themeColor) {
      case 'MAIN_5':
        return css`
          color: ${theme.colors.WHITE};
          background-color: ${theme.colors.MAIN_5};

          &:hover {
            background-color: ${theme.colors.MAIN_6};
          }
        `
      case 'GREY_1':
        return css`
          color: ${theme.colors.BLACK_3};
          background-color: ${theme.colors.GREY_1};
          &:hover {
            background-color: ${theme.colors.GREY_2};
          }
        `
      case 'WHITE':
        return css`
          color: ${theme.colors.BLACK_3};
          background-color: ${theme.colors.WHITE};
          &:hover {
            background-color: ${theme.colors.GREY_1};
          }
        `
      default:
        break
    }
  }};
`
