import { createSlice } from '@reduxjs/toolkit'
import { asyncState } from 'store/utils/async'
import { SystemState } from './system.type'

const initialState: SystemState = {
  async: {
    loginGuard: asyncState.initial(),
  },
}

const system = createSlice({
  name: 'system',
  initialState,
  reducers: {
    /**
     * @function async/guard
     */
    loginGuardStart: (state) => {
      // 상태 업데이트 하지 않음
    },
    loginGuardSuccess: (state) => {
      // 상태 업데이트 하지 않음
    },
  },
})

export const systemActions = system.actions
export default system.reducer
