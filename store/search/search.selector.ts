import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/root.reducer'

const selectSearch = (state: RootState) => state.search

export const selectSearchKeyword = createSelector(
  [selectSearch],
  (search) => search.searchKeyword
)

export const selectRecentKeywords = createSelector(
  [selectSearch],
  (search) => search.recentKeywords
)

export const selectSimilarKeywords = createSelector(
  [selectSearch],
  (search) => search.similarKeywords
)

export const selectFoodResults = createSelector(
  [selectSearch],
  (search) => search.foodResults
)

export const selectAsyncSearchKeyword = createSelector(
  [selectSearch],
  (search) => search.async.searchKeyword
)
