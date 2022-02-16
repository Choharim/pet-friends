import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/root.reducer'

const selectAuth = (state: RootState) => state.auth

export const selectSignUpData = createSelector([selectAuth], (auth) => ({
  email: auth.email,
  password: auth.password,
  nickName: auth.nickName,
  termsAgreements: auth.termsAgreements,
}))

export const selectEmail = createSelector([selectAuth], (auth) => auth.email)

export const selectPassword = createSelector(
  [selectAuth],
  (auth) => auth.password
)

export const selectIsLogin = createSelector(
  [selectAuth],
  (auth) => auth.isLogin
)

export const selectNickName = createSelector(
  [selectAuth],
  (auth) => auth.nickName
)

export const selectTermsAgreements = createSelector(
  [selectAuth],
  (auth) => auth.termsAgreements
)
