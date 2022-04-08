import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { searchActions } from 'store/search/search.slice'
import { selectSearchKeyword } from 'store/search/search.selector'
import { ICON_CDN_URL, pageNames } from 'constants/common'

import Layout from 'components/layout/layout'
import KeywordInput from './_containers/keyword-input'
import RecentKeyword from './_containers/recent-keyword'
import SimilarKeyword from './_containers/similar-keyword'
import FoodResults from './_containers/food-results'

export const RECENT_KEYWORDS_KEY = 'pet-friends_history'

const Search = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchKeyword = useSelector(selectSearchKeyword)

  useEffect(() => {
    dispatch(searchActions.getRecentKeywordsInLocalStorage())
  }, [dispatch])

  const goToBack = () => {
    router.back()
  }

  return (
    <Layout title="search" isNav={false}>
      <Wrapper>
        <Header>
          <GoBack
            src={`${ICON_CDN_URL}/512/6423/6423874.png`}
            alt="go_back-icon"
            onClick={goToBack}
          />
          <Link href={pageNames.HOME}>
            <a>
              <GoHome
                src={`${ICON_CDN_URL}/512/263/263115.png`}
                alt="home-icon"
              />
            </a>
          </Link>
        </Header>
        <KeywordInput searchKeyword={searchKeyword} />
        {!!searchKeyword ? <SimilarKeyword /> : <RecentKeyword />}
        <FoodResults />
      </Wrapper>
    </Layout>
  )
}

export default Search

const Wrapper = styled.div`
  display: grid;
  gap: 15px;
  margin: 20px 15px 0;
`
const Header = styled.header`
  display: flex;
  align-items: center;
`

const GoBack = styled.img`
  width: 32px;
  padding: 2px;
  margin-right: 15px;
  cursor: pointer;
`

const GoHome = styled.img`
  width: 30px;
  padding: 2px;
`
