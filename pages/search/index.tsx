import React, { useEffect } from 'react'

import Layout from 'components/layout/layout'
import KeywordInput from './_containers/keyword-input'
import GoBack from './_containers/go-back'
import styled from '@emotion/styled'
import RecentKeyword from './_containers/recent-keyword'
import { useDispatch } from 'react-redux'
import { searchActions } from 'store/search/search.slice'

export const RECENT_KEYWORDS_KEY = 'pet-friends_history'

const Search = () => {
  const dispatch = useDispatch()
  //TODO: 검색
  useEffect(() => {
    dispatch(searchActions.getRecentKeywordsInLocalStorage())
  }, [])

  return (
    <Layout title="search" isNav={false}>
      <Wrapper>
        <HeadWrapper>
          <GoBack />
          <KeywordInput />
        </HeadWrapper>
        <RecentKeyword />
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
