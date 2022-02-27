import styled from '@emotion/styled'
import Layout from 'components/layout/layout'
import React from 'react'
import Navigation from './navigation'

const Settings = () => {
  //TODO: 설정 (비밀번호, 닉네임, 이용약관,프로필 사진, 전화번호,주소 )
  return (
    <SecttingSection>
      <HeadWrapper>
        <SectionTitle>회원정보 수정</SectionTitle>
        <Signout>탈퇴하기</Signout>
      </HeadWrapper>
    </SecttingSection>
  )
}

export default Settings

const SecttingSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 80px 30px;
`

const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const SectionTitle = styled.span`
  ${({ theme }) => theme.fonts.SUB_TITLE_1};
  color: ${({ theme }) => theme.colors.BLACK_5};
`

const Signout = styled.span`
  ${({ theme }) => theme.fonts.BODY_3};
  color: ${({ theme }) => theme.colors.GREY_4};
  text-decoration: underline;
  cursor: pointer;
`
