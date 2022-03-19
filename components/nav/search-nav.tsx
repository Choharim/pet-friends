import styled from '@emotion/styled'
import Button from 'components/button/button'
import { deviceSizes, NAVIGATION_HEIGHT, pageNames } from 'constants/common'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLogin } from 'store/auth/auth.selector'
import AddressSearch from './address-search'
import DropdownMemu from './dropdown-menu'
import KeywordSearch from './keyword-search'

const SearchNav = () => {
  const router = useRouter()
  const isLogin = useSelector(selectIsLogin)

  const goToLogin = () => {
    router.push(pageNames.LOGIN)
  }

  return (
    <NavBox>
      <AddressSearch />
      <RightSectionWrapper>
        <KeywordSearch />
        {isLogin ? (
          <DropdownMemu />
        ) : (
          <LoginButton themeColor="WHITE" fitContents onClick={goToLogin}>
            로그인
          </LoginButton>
        )}
      </RightSectionWrapper>
    </NavBox>
  )
}

export default React.memo(SearchNav)

const NavBox = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: ${NAVIGATION_HEIGHT};
  width: 100%;
  max-width: ${deviceSizes.MAX_SIZE}px;
  margin: 0 auto;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_2};
`

const LoginButton = styled(Button)`
  color: ${({ theme }) => theme.colors.MAIN_5};
  padding: 7px 12px;
`
const RightSectionWrapper = styled.div`
  display: flex;
  align-items: center;
`
