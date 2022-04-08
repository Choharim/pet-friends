import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'

import {
  selectAsyncSearchKeyword,
  selectFoodResults,
} from 'store/search/search.selector'

const FoodResults = () => {
  const { loading, data, error } = useSelector(selectAsyncSearchKeyword)
  const foodResults = useSelector(selectFoodResults)

  return (
    <>
      {loading ? (
        <div>로딩중</div>
      ) : (
        data &&
        (!!foodResults.length ? (
          foodResults.map((food, i) => (
            <Card key={`search_food_results-${i}`}>
              <Preview src={food.main_image} />
              <Info>
                <Name>{food.name}</Name>
              </Info>
            </Card>
          ))
        ) : (
          <div>결과 없음</div>
        ))
      )}
    </>
  )
}

export default FoodResults

const Card = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 10px;
  border-radius: 4px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
const Preview = styled.img`
  width: 100px;
  border-radius: 4px;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`
const Name = styled.span`
  ${({ theme }) => theme.fonts.BODY_2};
`

const Price = styled.span`
  ${({ theme }) => theme.fonts.BODY_2};
`
