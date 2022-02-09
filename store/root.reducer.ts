import { combineReducers } from '@reduxjs/toolkit'
import ui from './ui/ui.slice'
import auth from './auth/auth.slice'

export const rootReducer = combineReducers({
  ui,
  auth,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
