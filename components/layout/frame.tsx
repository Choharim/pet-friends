import styled from '@emotion/styled'
import { deviceSizes } from 'constants/common'
import React from 'react'

const Frame: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

export default Frame

const Wrapper = styled.div`
  width: 100%;
  max-width: ${deviceSizes.MIN_TABLET_SIZE}px;
  height: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.WHITE};
`
