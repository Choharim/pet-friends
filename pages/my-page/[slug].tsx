import Layout from 'components/layout/layout'
import { pageNames } from 'constants/common'
import { useRouter } from 'next/router'
import React from 'react'
import Navigation from './_containers/navigation'
import Settings from './_containers/settings'

const MyPage = () => {
  const router = useRouter()

  const renderComponent = () => {
    switch (router.asPath) {
      case pageNames.SETTINGS:
        return <Settings />

      default:
        return null
    }
  }

  return (
    <Layout title="마이페이지">
      <Navigation />
      {renderComponent()}
    </Layout>
  )
}

export default MyPage
