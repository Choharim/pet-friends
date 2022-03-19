import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchState } from './search.type'

const initialState: SearchState = {
  searchKeyword: '',
}

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKeyword: (state, { payload }: PayloadAction<string>) => {
      state.searchKeyword = payload
    },
    searchKeywordStart: (state) => {
      // 상태 업데이트 없음
    },
    searchKeywordSuccess: (state) => {
      // 상태 업데이트 없음
    },
    searchKeywordFail: (state) => {
      // 상태 업데이트 없음
    },
  },
})

export const searchActions = search.actions
export default search.reducer
