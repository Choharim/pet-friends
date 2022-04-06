import styled from '@emotion/styled'
import { deviceSizes } from 'constants/common'
import React from 'react'

const Frame: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default Frame

const Wrapper = styled.main`
  width: 100%;
  max-width: ${deviceSizes.MAX_SIZE}px;
  height: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.WHITE};
`
