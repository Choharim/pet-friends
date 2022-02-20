import Layout from 'components/layout/layout'
import type { NextPage } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectNickName } from 'store/auth/auth.selector'

const Home: NextPage = () => {
  const nickName = useSelector(selectNickName)
  //TODO: 메뉴바 만들기
  //TODO: home 개발

  return (
    <Layout title="home">
      <div>{nickName}</div>
    </Layout>
  )
}

export default Home
