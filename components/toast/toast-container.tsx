import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import { selectToasts } from 'store/ui/ui.selector'

const RenderInToastContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const toastContainerElement = useMemo(
    () => document.getElementById('toast-container') as HTMLElement,
    []
  )

  return createPortal(children, toastContainerElement)
}

const ToastContainer = () => {
  const toasts = useSelector(selectToasts)

  return (
    <RenderInToastContainer>
      {toasts.length &&
        toasts.map((toast, i) => (
          <ToastBox key={toast.key} sectionHeight={`${i * (46 + 3)}px`}>
            {toast.key}
          </ToastBox>
        ))}
    </RenderInToastContainer>
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
  70% {
    opacity: 1;
    margin-top : 30px;
    }
  100% {
    opacity: 0;
    margin:0;
    }
`

const ToastBox = styled.div<{ sectionHeight: string }>`
  position: absolute;
  right: 50%;
  top: calc(70px + (${({ sectionHeight }) => sectionHeight}));
  transform: translateX(50%);
  animation: ${ToastAnimation} 2.5s forwards ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.BLACK_2};
  color: ${({ theme }) => theme.colors.WHITE};
  ${({ theme }) => theme.fonts.SUB_TITLE_3};
  padding: 10px 20px;
  min-width: 300px;
  border-radius: 4px;
  z-index: 1000;
`
