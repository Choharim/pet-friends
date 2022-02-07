import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { useBlockScroll } from 'utils'

type ModalType = 'top' | 'right' | 'left' | 'bottom' | 'center'

type ModalProps = {
  type?: ModalType
  onClick?: () => void
  children: React.ReactNode
}

const Modal = ({ children, onClick, type = 'center' }: ModalProps) => {
  useBlockScroll()

  return (
    <ModalOverlay onClick={onClick}>
      <ModalContainer
        type={type}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {children}
      </ModalContainer>
    </ModalOverlay>
  )
}

export default Modal

const ModalBgVisible = keyframes`
  from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  overflow: hidden;
  animation: ${ModalBgVisible} 0.3s;
`

const ModalContainer = styled.div<{ type: ModalType }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  ${({ type }) =>
    type === 'center' &&
    css`
      right: 50%;
      top: 50%;
      transform: translateX(50%) translateY(-50%);
      animation: ${ModalCenter} 0.3s forwards;
    `};
  ${({ type }) =>
    type === 'bottom' &&
    css`
      animation: ${ModalBottom} 0.3s forwards;
    `};
  ${({ type }) =>
    type === 'top' &&
    css`
      animation: ${ModalTop} 0.3s forwards;
    `};
  ${({ type }) =>
    type === 'left' &&
    css`
      animation: ${ModalLeft} 0.3s forwards;
    `};
  ${({ type }) =>
    type === 'right' &&
    css`
      animation: ${ModalRight} 0.3s forwards;
    `};
`

const ModalCenter = keyframes`
 from {
    opacity: 0;
    margin-top:-25px;
    }
    to {
    opacity: 1;
    margin-top:0;
    }
`

const ModalBottom = keyframes`
  from {
    bottom: -100%;
    }
    to {
    bottom: 0;
    }
`

const ModalTop = keyframes`
  from {
    top: -100%;    
    }
    to {
    top: 0;
    }
`

const ModalLeft = keyframes`
  from {
    left: -100%;
    }
    to {
    left: 0;
    }
`

const ModalRight = keyframes`
  from {
    right: -100%;
    }
    to {
    right: 0;
    }
`
