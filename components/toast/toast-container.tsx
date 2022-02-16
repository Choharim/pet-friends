import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import { selectToasts } from 'store/ui/ui.selector'
import { TOAST_DESC_MAP } from 'store/ui/ui.type'

const PortalForToastContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const toastContainerElement =
    typeof window !== 'undefined' &&
    (document.getElementById('toast-container') as HTMLElement)
  return toastContainerElement && children
    ? createPortal(children, toastContainerElement)
    : null
}

const ToastContainer = () => {
  const toasts = useSelector(selectToasts)

  return (
    <PortalForToastContainer>
      {toasts.length && (
        <Container>
          {toasts.map((toast) => (
            <ToastBox key={toast.key}>{TOAST_DESC_MAP[toast.descKey]}</ToastBox>
          ))}
        </Container>
      )}
    </PortalForToastContainer>
  )
}

export default ToastContainer

const ToastAnimation = keyframes`
  0% {
    opacity: 0;
    margin:0;
    }
  15% {
    opacity: 1;
    }
  65% {
    opacity: 1;
    margin-top : 30px;
    }
  80% {
    opacity: 1;
    }
  100% {
    opacity: 0;
    margin:0;
    }
`

const Container = styled.div`
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  top: 5px;
`

const ToastBox = styled.div`
  animation: ${ToastAnimation} 2.5s forwards ease;

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
