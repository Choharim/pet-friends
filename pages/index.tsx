import styled from '@emotion/styled'
import Layout from 'components/layout/layout'
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

  //TODO: 메뉴바 만들기
  //TODO: home 개발
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
