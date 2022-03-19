import React from 'react'

import useLoginGuard from 'hooks/use-login-guard'

import Layout from 'components/layout/layout'

const MyPage = () => {
  useLoginGuard()

  return (
    <Layout title="마이페이지">
      <span>장바구니</span>
    </Layout>
  )
}

export default MyPage
