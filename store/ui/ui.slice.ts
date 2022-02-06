import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UIState, ModalName, Toast } from './ui.types'

const initialState: UIState = {
  modals: [],
  toasts: [],
}

const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleModal: (
      state,
      { payload }: PayloadAction<{ modalName: ModalName; timout?: number }>
    ) => {
      if (state.modals.some((modal) => modal === payload.modalName)) {
        state.modals = state.modals.filter(
          (modal) => modal !== payload.modalName
        )
      } else {
        state.modals = [...state.modals, payload.modalName]
      }
    },

    showToast: (state, _: PayloadAction<Toast>) => {
      state
    },
    addToast: (state, { payload }: PayloadAction<Toast>) => {
      state.toasts = [payload, ...state.toasts]
    },

    clearToast: (state, { payload }: PayloadAction<Toast>) => {
      if (state.toasts.some((toast) => toast.key === payload.key)) {
        state.toasts = state.toasts.filter((toast) => toast.key !== payload.key)
      }
    },
  },
})

export const { toggleModal, showToast, addToast, clearToast } = ui.actions
export default ui.reducer
