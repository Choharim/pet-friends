import React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { ICON_CDN_URL, pageNames } from 'constants/common'

const KeywordSearch = () => {
  const router = useRouter()

  const goToKeywordSearch = () => {
    router.push(pageNames.SEARCH)
  }

  return (
    <SearchIcon
      onClick={goToKeywordSearch}
      src={`${ICON_CDN_URL}/512/622/622669.png`}
      alt="keyword-serarch-icon"
    />
  )
}

export default KeywordSearch

const SearchIcon = styled.img`
  width: 32px;
  padding: 5px;
  margin-right: 15px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_1};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.GREY_2};
  }
`
