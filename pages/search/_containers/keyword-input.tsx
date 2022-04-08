import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { searchActions } from 'store/search/search.slice'
import { ICON_CDN_URL, pageNames } from 'constants/common'

const MAX_KEYWORD_LENGTH = 100

type KeywordInputProps = {
  searchKeyword: string
}

const KeywordInput = ({ searchKeyword }: KeywordInputProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [searchKeyword])

  const changeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length > MAX_KEYWORD_LENGTH) return

    dispatch(searchActions.setSearchKeyword(value))
  }

  const resetKeyword = () => {
    dispatch(searchActions.setSearchKeyword(''))
  }

  const enterKeyword = () => {
    router.push(`${pageNames.SEARCH}?query=${searchKeyword}`)
    dispatch(searchActions.searchKeywordStart({ searchKeyword }))
  }

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      enterKeyword()
    }
  }

  return (
    <InputBox>
      <SearchButton onClick={enterKeyword} />
      <SearchInput
        ref={ref}
        type="search"
        value={searchKeyword}
        placeholder="상품명, 수업명, 재료로 검색하세요."
        onChange={changeSearchKeyword}
        onKeyPress={pressEnter}
      />
      {!!searchKeyword && (
        <ResetIcon
          onClick={resetKeyword}
          src={`${ICON_CDN_URL}/512/1828/1828747.png`}
          alt="keyword-reset_icon"
        />
      )}
    </InputBox>
  )
}

export default React.memo(KeywordInput)

const InputBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.GREY_1};
`

const SearchButton = styled.button`
  width: 24.5px;
  height: 23px;
  margin-right: 5px;
  background: no-repeat center/80% url(${ICON_CDN_URL}/512/622/622669.png);
  border: none;
  cursor: pointer;
`
const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  ${({ theme }) => theme.fonts.BODY_1};
  color: ${({ theme }) => theme.colors.BLACK_3};
  background-color: transparent;
  outline: none;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.GREY_7};
  }

  /* clears the ‘X’ from Internet Explorer */
  &::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  &::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  /* clears the ‘X’ from Chrome */
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`

const ResetIcon = styled.img`
  width: 20px;
  padding: 5px;
  cursor: pointer;
`
