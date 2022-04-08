import React from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

import { ICON_CDN_URL, pageNames } from 'constants/common'
import { selectRecentKeywords } from 'store/search/search.selector'
import { searchActions } from 'store/search/search.slice'
import { dotFormat } from 'utils'

const RecentKeyword = () => {
  const dispatch = useDispatch()
  const recentKeywords = useSelector(selectRecentKeywords)

  const deleteKeyword = (keywordId: number) => {
    dispatch(searchActions.deleteRecentKeyword({ keywordId }))
  }

  const resetAllRecentKeyword = () => {
    dispatch(searchActions.clearRecentKeyword())
  }

  const searchRecentKeyword = (keyword: string) => {
    dispatch(searchActions.setSearchKeyword(keyword))
    dispatch(searchActions.searchKeywordStart({ searchKeyword: keyword }))
  }

  return (
    <>
      {!!recentKeywords.length && (
        <>
          <TitleWrapper>
            <Title>최근 검색어</Title>
            <AllReset onClick={resetAllRecentKeyword}>전체 삭제</AllReset>
          </TitleWrapper>
          <RecentKeywordContainer>
            {recentKeywords.map((recentKeyword) => (
              <KeywordWrapper key={`recent_keyword-${recentKeyword.id}`}>
                <Wrapper
                  onClick={() => searchRecentKeyword(recentKeyword.keyword)}
                >
                  <Link
                    href={`${pageNames.SEARCH}?query=${recentKeyword.keyword}`}
                  >
                    <a>
                      <Keyword>{recentKeyword.keyword}</Keyword>
                    </a>
                  </Link>
                </Wrapper>

                <SearchedDate>{dotFormat(recentKeyword.id)}</SearchedDate>
                <DeleteKeyword
                  onClick={() => deleteKeyword(recentKeyword.id)}
                  src={`${ICON_CDN_URL}/512/7124/7124230.png`}
                  alt="delete-keyword_icon"
                />
              </KeywordWrapper>
            ))}
          </RecentKeywordContainer>
        </>
      )}
    </>
  )
}

export default RecentKeyword

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
const RecentKeywordContainer = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`

const KeywordWrapper = styled.li`
  display: flex;
  align-items: center;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_1};
  }
`

const Wrapper = styled.div`
  width: 100%;
  > a {
    padding: 5px 0;
    display: inline-block;
    width: 100%;
  }
`

const Keyword = styled.span`
  ${({ theme }) => theme.fonts.BODY_2};
  color: ${({ theme }) => theme.colors.BLACK_3};
`

const SearchedDate = styled.span`
  ${({ theme }) => theme.fonts.BODY_6};
  color: ${({ theme }) => theme.colors.GREY_8};
  margin-right: 10px;
`

const DeleteKeyword = styled.img`
  width: 17px;
  padding: 3px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.GREY_2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_3};
  }
`
