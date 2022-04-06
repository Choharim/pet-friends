import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'

import { searchActions } from 'store/search/search.slice'
import { selectSearchKeyword } from 'store/search/search.selector'

import Layout from 'components/layout/layout'
import GoBack from './_containers/go-back'
import KeywordInput from './_containers/keyword-input'
import RecentKeyword from './_containers/recent-keyword'
import SimilarKeyword from './_containers/similar-keyword'
import FoodResults from './_containers/food-results'

export const RECENT_KEYWORDS_KEY = 'pet-friends_history'

const Search = () => {
  const dispatch = useDispatch()
  const searchKeyword = useSelector(selectSearchKeyword)

  useEffect(() => {
    dispatch(searchActions.getRecentKeywordsInLocalStorage())
  }, [dispatch])

  return (
    <Layout title="search" isNav={false}>
      <Wrapper>
        <HeadWrapper>
          <GoBack />
          <KeywordInput searchKeyword={searchKeyword} />
        </HeadWrapper>
        {!!searchKeyword ? <SimilarKeyword /> : <RecentKeyword />}
        <FoodResults />
      </Wrapper>
    </Layout>
  )
}

export default Search

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 15px 0;
`
const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
