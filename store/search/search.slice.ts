import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RecentKeyword, SearchState } from './search.type'

const initialState: SearchState = {
  searchKeyword: '',
  recentKeywords: [],
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
      // 상태 업데이트 없음
    },
    searchKeywordSuccess: (state) => {
      // 상태 업데이트 없음
    },
    searchKeywordFail: (state) => {
      // 상태 업데이트 없음
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
