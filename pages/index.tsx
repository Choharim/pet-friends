import styled from '@emotion/styled'
import Layout from 'components/layout/layout'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFoods } from 'store/ui/ui.selector'
import { uiActions } from 'store/ui/ui.slice'
import { ToastDescKey } from 'store/ui/ui.type'

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const foods = useSelector(selectFoods)

  const toast = () => {
    dispatch(
      uiActions.showToast({
        descKey: ToastDescKey.changePassword,
        key: new Date().getTime(),
      })
    )
  }

  useEffect(() => {
    dispatch(uiActions.getFoodsStart())
  }, [dispatch])

  //TODO: 메뉴바 만들기
  //TODO: home 개발
  return (
    <Layout title="home">
      {foods?.map((food, i) => (
        <span key={`${food.name}-${i}`}>{food.name}</span>
      ))}
      <Text onClick={toast}>hi</Text>
    </Layout>
  )
}

export default Home

const Text = styled.span`
  color: ${({ theme }) => theme.colors.MAIN_1};
`
