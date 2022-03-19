import React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { ICON_CDN_URL, pageNames } from 'constants/common'

const Header = () => {
  const router = useRouter()

  const goToHome = () => {
    router.push(pageNames.HOME)
  }

  return (
    <>
      <LoginIcon
        onClick={goToHome}
        src={`${ICON_CDN_URL}/512/6597/6597983.png`}
        alt="login_icon"
      />
      <PageTitle>로그인</PageTitle>
    </>
  )
}

export default React.memo(Header)

const PageTitle = styled.h2`
  ${({ theme }) => theme.fonts.HEADER_3};
  color: ${({ theme }) => theme.colors.BLACK_3};
  margin: 20px 0;
`

const LoginIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 50px;
  cursor: pointer;
`
