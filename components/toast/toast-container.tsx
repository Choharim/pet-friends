import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectToasts } from 'store/ui/ui.selector'
import { TOAST_DESC_MAP } from 'store/ui/ui.type'

export const TOAST_TIMEOUT = 3000

const ToastContainer = () => {
  const toasts = useSelector(selectToasts)

  return (
    <>
      {!!toasts.length && (
        <Container>
          {toasts.map((toast) => (
            <ToastBox key={toast.key}>{TOAST_DESC_MAP[toast.descKey]}</ToastBox>
          ))}
        </Container>
      )}
    </>
  )
}

export default ToastContainer

const ToastAnimation = keyframes`
  0% {
    opacity: 0;
    }
  15% {
    opacity: 1;
    }
  30%{
    transform: translateY(100px);
    }
  100% {
    transform: translateY(-100%);
   }
`

const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 50%;
  transform: translateX(50%);
`

const ToastBox = styled.div`
  animation: ${ToastAnimation} ${TOAST_TIMEOUT + 100}ms ease;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.BLACK_4};
  color: ${({ theme }) => theme.colors.WHITE};
  ${({ theme }) => theme.fonts.BODY_3};
  padding: 12px 24px;
  min-width: 300px;
  border-radius: 4px;
  z-index: 1000;
`
