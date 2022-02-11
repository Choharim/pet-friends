import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/root.reducer'

const selectAuth = (state: RootState) => state.auth

export const selectEmail = createSelector([selectAuth], (auth) => auth.email)

export const selectPassword = createSelector(
  [selectAuth],
  (auth) => auth.password
)

export const selectIsLogin = createSelector(
  [selectAuth],
  (auth) => auth.isLogin
)
