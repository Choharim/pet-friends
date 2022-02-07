import styled from '@emotion/styled'
import Layout from 'components/layout/Layout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Layout title="home">
      <Text>hi</Text>
    </Layout>
  )
}

export default Home

const Text = styled.span`
  color: ${({ theme }) => theme.colors.MAIN_1};
`
