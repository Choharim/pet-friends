import styled from '@emotion/styled'
import Layout from 'components/layout/Layout'
import type { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import { uiActions } from 'store/ui/ui.slice'
import { ToastDescKey } from 'store/ui/ui.type'

const Home: NextPage = () => {
  const dispatch = useDispatch()

  const toast = () => {
    dispatch(
      uiActions.showToast({
        descKey: ToastDescKey.changePassword,
        key: new Date().getTime(),
      })
    )
  }

  return (
    <Layout title="home">
      <Text onClick={toast}>hi</Text>
    </Layout>
  )
}

export default Home

const Text = styled.span`
  color: ${({ theme }) => theme.colors.MAIN_1};
`
