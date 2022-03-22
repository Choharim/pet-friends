import React from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'

import { ICON_CDN_URL } from 'constants/common'
import { selectRecentKeywords } from 'store/search/search.selector'
import { searchActions } from 'store/search/search.slice'

const RecentKeyword = () => {
  const dispatch = useDispatch()
  const recentKeywords = useSelector(selectRecentKeywords)

  const deleteKeyword = (keywordId: number) => {
    dispatch(searchActions.deleteRecentKeyword({ keywordId }))
  }

  const resetAllRecentKeyword = () => {
    dispatch(searchActions.clearRecentKeyword())
  }

  return (
    <>
      {!!recentKeywords.length && (
        <>
          <Wrapper>
            <Title>최근 검색어</Title>
            <AllReset onClick={resetAllRecentKeyword}>전체 삭제</AllReset>
          </Wrapper>
          <RecentKeywordContainer>
            {recentKeywords.map((recentKeyword) => (
              <Wrapper key={`recent_keyword-${recentKeyword.id}`}>
                <Keyword>{recentKeyword.keyword}</Keyword>
                <DeleteKeyword
                  onClick={() => deleteKeyword(recentKeyword.id)}
                  src={`${ICON_CDN_URL}/512/7124/7124230.png`}
                  alt="delete-keyword_icon"
                />
              </Wrapper>
            ))}
          </RecentKeywordContainer>
        </>
      )}
    </>
  )
}

export default RecentKeyword

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 15px;
`

const Title = styled.h2`
  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme }) => theme.colors.BLACK_5};
`

const AllReset = styled.span`
  ${({ theme }) => theme.fonts.BODY_5};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GREY_8};
  padding: 5px;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_1};
    color: ${({ theme }) => theme.colors.BLACK_1};
  }
`
const RecentKeywordContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

const Keyword = styled.span`
  width: 100%;
  ${({ theme }) => theme.fonts.BODY_2};
  color: ${({ theme }) => theme.colors.BLACK_3};
  cursor: pointer;
`

const DeleteKeyword = styled.img`
  width: 16px;
  padding: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.GREY_3};
  cursor: pointer;
`
