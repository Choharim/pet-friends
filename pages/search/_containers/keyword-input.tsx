import React from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'

import { selectSearchKeyword } from 'store/search/search.selector'
import { searchActions } from 'store/search/search.slice'
import { ICON_CDN_URL } from 'constants/common'

const MAX_KEYWORD_LENGTH = 100

const KeywordInput = () => {
  const dispatch = useDispatch()
  const searchKeyword = useSelector(selectSearchKeyword)

  const changeSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length > MAX_KEYWORD_LENGTH) return

    dispatch(searchActions.setSearchKeyword(value))
  }

  const resetKeyword = () => {
    dispatch(searchActions.setSearchKeyword(''))
  }

  const enterKeyword = () => {
    dispatch(searchActions.searchKeywordStart())
  }

  return (
    <InputWrapper>
      <SearchIcon
        onClick={enterKeyword}
        src={`${ICON_CDN_URL}/512/622/622669.png`}
        alt="keyword-serarch_icon"
      />
      <SearchInput
        type="text"
        value={searchKeyword}
        placeholder="상품명, 수업명, 재료로 검색하세요."
        onChange={changeSearchKeyword}
        autoFocus
      />
      {!!searchKeyword && (
        <ResetIcon
          onClick={resetKeyword}
          src={`${ICON_CDN_URL}/512/1828/1828747.png`}
          alt="keyword-reset_icon"
        />
      )}
    </InputWrapper>
  )
}

export default React.memo(KeywordInput)

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.GREY_2};
`

const SearchIcon = styled.img`
  width: 32px;
  padding: 5px;
  margin-right: 15px;
  border-radius: 4px;
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
`

const ResetIcon = styled.img`
  width: 20px;
  padding: 5px;
  cursor: pointer;
`
