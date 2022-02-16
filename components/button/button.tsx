import styled from '@emotion/styled'
import React, { HTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
const Button = (props: ButtonProps) => {
  const { children, ...rest } = props
  return <ButtonBox {...rest}>{children}</ButtonBox>
}

export default Button

export const ButtonBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  border: none;
  outline: none;

  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ theme }) => theme.colors.MAIN_2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.MAIN_1};
  }
`
