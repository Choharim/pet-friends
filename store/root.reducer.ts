import { combineReducers } from '@reduxjs/toolkit'
import ui from './ui/ui.slice'
import auth from './auth/auth.slice'
import system from './system/system.slice'

export const rootReducer = combineReducers({
  ui,
  auth,
  system,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
