import styled from '@emotion/styled'
import { ICON_CDN_URL, NAVIGATION_HEIGHT } from 'constants/common'
import React from 'react'

const Navigation = () => {
  return (
    <NavContainer>
      <Navbars
        src={`${ICON_CDN_URL}/512/545/545705.png`}
        alt="navigation_bars"
      />
    </NavContainer>
  )
}

export default Navigation

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${NAVIGATION_HEIGHT};
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_2};
`
const Navbars = styled.img`
  width: 24px;
  height: 24px;
  padding: 4px;

  cursor: pointer;
`
