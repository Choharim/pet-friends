import { RootState } from '../root.reducer'
import { createSelector } from 'reselect'

const selectUI = (state: RootState) => state.ui

export const selectModals = createSelector([selectUI], (ui) => ui.modals)

export const selectToasts = createSelector([selectUI], (ui) => ui.toasts)
