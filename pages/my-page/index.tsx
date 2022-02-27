import Layout from 'components/layout/layout'
import React from 'react'
import Navigation from './_containers/navigation'

const MyPage = () => {
  //TODO: 설정 (비밀번호, 닉네임, 이용약관,프로필 사진, 전화번호,주소 )
  return (
    <Layout title="마이페이지">
      <Navigation />
    </Layout>
  )
}

export default MyPage
