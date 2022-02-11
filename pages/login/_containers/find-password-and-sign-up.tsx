import styled from '@emotion/styled'
import { pageNames } from 'constants/common'
import { useRouter } from 'next/router'
import React from 'react'

const FindPasswordAndSignUp = () => {
  const router = useRouter()

  const goToSignUp = () => {
    router.push(pageNames.SIGN_UP)
  }

  const findPassword = () => {
    router.push(pageNames.FIND_PASSWORD)
  }

  return (
    <Container>
      <FindPasswordButton onClick={findPassword}>
        비밀번호 찾기
      </FindPasswordButton>
      {/**
       * TODO: 회원가입 페이지 markdown
       */}
      <GoToSignUp onClick={goToSignUp}>회원가입</GoToSignUp>
    </Container>
  )
}

export default FindPasswordAndSignUp

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`
const FindPasswordButton = styled.span`
  ${({ theme }) => theme.fonts.BODY_3};
  color: ${({ theme }) => theme.colors.BLACK_3};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.BLACK_5};
  }
`

const GoToSignUp = styled(FindPasswordButton)``
