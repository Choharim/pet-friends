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
      // if (state.toasts.some((toast) => toast.descKey === descKey)) return

      state.toasts = [{ descKey, key }, ...state.toasts]
    },
    clearToast: (state, _: PayloadAction) => {
      state.toasts = state.toasts.slice(0, -1)
    },
  },
})

export const { showModal, closeModal, showToast, clearToast } = ui.actions
export default ui.reducer
