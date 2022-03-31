import styled from '@emotion/styled'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSimilarKeywords } from 'store/search/search.selector'
import { searchActions } from 'store/search/search.slice'

const SimilarKeyword = () => {
  const dispatch = useDispatch()
  const similarKeywords = useSelector(selectSimilarKeywords)

  const searchRecentKeyword = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const keyword = e.currentTarget.innerText

    dispatch(searchActions.setSearchKeyword(keyword))
    dispatch(searchActions.searchKeywordStart({ searchKeyword: keyword }))
  }

  return (
    <>
      {!!similarKeywords.length &&
        similarKeywords.map((keyword, i) => (
          <Wrapper
            key={`similar_${keyword}-${i}`}
            onClick={searchRecentKeyword}
          >
            {keyword}
          </Wrapper>
        ))}
    </>
  )
}

export default SimilarKeyword

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 15px;
  cursor: pointer;
`
