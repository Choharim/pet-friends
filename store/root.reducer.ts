import { combineReducers } from '@reduxjs/toolkit'
import ui from './ui/ui.slice'

export const rootReducer = combineReducers({
  ui,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
