import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ICON_CDN_URL } from 'constants/common'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRecentKeywords } from 'store/search/search.selector'
import { searchActions } from 'store/search/search.slice'

const RecentKeyword = () => {
  const dispatch = useDispatch()
  const recentKeywords = useSelector(selectRecentKeywords)

  const deleteKeyword = (keywordId: number) => {
    dispatch(searchActions.deleteRecentKeyword(keywordId))
  }

  return (
    <>
      {!!recentKeywords.length && (
        <>
          <Wrapper>
            <Title>최근 검색어</Title>
            <AllReset>전체 삭제</AllReset>
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

  margin: 10px 0;
`

const Title = styled.h2`
  ${({ theme }) => theme.fonts.SUB_TITLE_4};
  color: ${({ theme }) => theme.colors.BLACK_5};
`

const AllReset = styled.span`
  ${({ theme }) => theme.fonts.BODY_2};
  color: ${({ theme }) => theme.colors.GREY_7};
  cursor: pointer;
  padding: 2px;
`
const RecentKeywordContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Keyword = styled.span`
  ${({ theme }) => theme.fonts.BODY_2};
  color: ${({ theme }) => theme.colors.GREY_7};
  cursor: pointer;
`

const DeleteKeyword = styled.img`
  width: 10px;
  padding: 2px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.GREY_3};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_4};
  }
`
