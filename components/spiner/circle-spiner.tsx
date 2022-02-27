import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

function CircleSpiner() {
  return <Spiner />
}

export default CircleSpiner

const SpinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
    `

const Spiner = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.GREY_1};
  border-top: 2px solid ${({ theme }) => theme.colors.BLACK_3};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${SpinAnimation} 1.2s ease-out infinite;
  margin: 0 5px;
`
