import styled from '@emotion/styled'
import Layout from 'components/layout/Layout'
import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import { showToast } from 'store/ui/ui.slice'
import { TOAST_KEY } from 'store/ui/ui.types'

const Home: NextPage = () => {
  const dispatch = useDispatch()

  const test = () => {
    dispatch(showToast({ key: TOAST_KEY.changeOwnerInfo }))
  }
  return (
    <Layout title="home">
      <Text onClick={test}>hi</Text>
    </Layout>
  )
}

export default Home

const Text = styled.span`
  color: ${({ theme }) => theme.colors.MAIN_1};
`
