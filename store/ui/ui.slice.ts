import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { asyncState } from 'store/utils/async'
import { UIState, ModalName, Toast, Food } from './ui.type'

const initialState: UIState = {
  async: {
    getFoods: asyncState.initial(),
  },
  modals: [],
  toasts: [],
  foods: [],
}

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showModal: (
      state,
      { payload }: PayloadAction<{ modalName: ModalName; timout?: number }>
    ) => {
      state.modals = [...state.modals, payload.modalName]
    },
    closeModal: (state, { payload }: PayloadAction<ModalName>) => {
      state.modals = state.modals.filter((modal) => modal !== payload)
    },

    showToast: (state, { payload: { descKey, key } }: PayloadAction<Toast>) => {
      state.toasts = [{ descKey, key }, ...state.toasts]
    },
    clearToast: (state) => {
      state.toasts = state.toasts.slice(0, -1)
    },
    getFoodsStart: (state) => {
      state.async.getFoods = asyncState.load()
    },
    getFoodsSuccess: (state, { payload }: PayloadAction<Food[]>) => {
      state.async.getFoods = asyncState.success()
      state.foods = payload
    },
    getFoodsFail: (state, { payload }: PayloadAction<AxiosError>) => {
      state.async.getFoods = asyncState.error(payload)
    },
  },
})

export const uiActions = ui.actions
export default ui.reducer
