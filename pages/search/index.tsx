import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { searchActions } from 'store/search/search.slice'

import Layout from 'components/layout/layout'
import GoBack from './_containers/go-back'
import KeywordInput from './_containers/keyword-input'
import RecentKeyword from './_containers/recent-keyword'

export const RECENT_KEYWORDS_KEY = 'pet-friends_history'

const Search = () => {
  const dispatch = useDispatch()

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

      {/* {
        TODO: 검색 결과 
      } */}
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
