import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectSimilarKeywords } from 'store/search/search.selector'

const SimilarKeyword = () => {
  const similarKeywords = useSelector(selectSimilarKeywords)

  //TODO: 해당 키워드 클릭시 결과값 보여주기
  return (
    <>
      {!!similarKeywords.length &&
        similarKeywords.map((keyword, i) => (
          <Wrapper key={`similar_${keyword}-${i}`}>{keyword}</Wrapper>
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
`
