import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { Food } from 'store/food/food.type'
import { asyncState } from 'store/utils/async'
import { RecentKeyword, SearchState } from './search.type'

const initialState: SearchState = {
  async: {
    getSimilarKeywords: asyncState.initial(),
    searchKeyword: asyncState.initial(),
  },
  searchKeyword: '',
  recentKeywords: [],
  similarKeywords: [],
  foodResults: [],
}

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKeyword: (state, { payload }: PayloadAction<string>) => {
      state.searchKeyword = payload
    },

    /**
     * @function trigger
     * 검색 api
     * recentKeyword add
     */
    searchKeywordStart: (
      state,
      { payload }: PayloadAction<{ searchKeyword: string }>
    ) => {
      state.async.searchKeyword = asyncState.load()
      // 상태 업데이트 없음
    },
    searchKeywordSuccess: (state, { payload }: PayloadAction<Food[]>) => {
      state.async.searchKeyword = asyncState.success()
      state.foodResults = payload
    },
    searchKeywordFail: (state, { payload }: PayloadAction<AxiosError>) => {
      state.async.searchKeyword = asyncState.error(payload)
      // 상태 업데이트 없음
    },

    getSimilarKeywordsSuccess: (
      state,
      { payload }: PayloadAction<string[]>
    ) => {
      state.async.getSimilarKeywords = asyncState.success()
      state.similarKeywords = payload
    },
    getSimilarKeywordsFail: (state, { payload }: PayloadAction<AxiosError>) => {
      state.async.getSimilarKeywords = asyncState.error(payload)
    },

    addRecentKeyword: (state, { payload }: PayloadAction<RecentKeyword>) => {
      //최근 검색어는 최대 5개까지 보관
      if (state.recentKeywords.length >= 5) {
        state.recentKeywords = state.recentKeywords.slice(1).concat(payload)
      } else {
        state.recentKeywords = [...state.recentKeywords, payload]
      }
    },
    deleteRecentKeyword: (
      state,
      { payload: { keywordId } }: PayloadAction<{ keywordId: number }>
    ) => {
      state.recentKeywords = state.recentKeywords.filter(
        (recentKeyword) => recentKeyword?.id !== keywordId
      )
    },
    clearRecentKeyword: (state) => {
      state.recentKeywords = []
    },

    getRecentKeywordsInLocalStorage: () => {
      // 상태 업데이트 하지 않음
    },
    setRecentKeywords: (state, { payload }: PayloadAction<RecentKeyword[]>) => {
      state.recentKeywords = payload
    },
  },
})

export const searchActions = search.actions
export default search.reducer
