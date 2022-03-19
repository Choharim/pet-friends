import React from 'react'

import Layout from 'components/layout/layout'
import KeywordInput from './_containers/keyword-input'
import GoBack from './_containers/go-back'
import styled from '@emotion/styled'

const Search = () => {
  //TODO: 검색
  return (
    <Layout title="search" isNav={false}>
      <HeadWrapper>
        <GoBack />
        <KeywordInput />
      </HeadWrapper>
    </Layout>
  )
}

export default Search

const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 20px);
  margin: 20px 10px 0;
`
