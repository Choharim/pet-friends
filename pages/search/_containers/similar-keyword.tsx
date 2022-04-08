import styled from '@emotion/styled'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { pageNames } from 'constants/common'
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
    <KeywordContainer>
      {!!similarKeywords.length &&
        similarKeywords.map((keyword, i) => (
          <KeywordWrapper
            key={`similar_${keyword}-${i}`}
            onClick={searchRecentKeyword}
          >
            <Link href={`${pageNames.SEARCH}?query=${keyword}`}>
              <a>
                <Keyword>{keyword}</Keyword>
              </a>
            </Link>
          </KeywordWrapper>
        ))}
    </KeywordContainer>
  )
}

export default SimilarKeyword

const KeywordContainer = styled.ul``

const KeywordWrapper = styled.li`
  border-radius: 2px;
  cursor: pointer;

  & > a {
    padding: 5px 0;
    display: block;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_1};
  }
`

const Keyword = styled.span`
  ${({ theme }) => theme.fonts.BODY_1};
  color: ${({ theme }) => theme.colors.BLACK_1};
`
