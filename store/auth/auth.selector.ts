import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/root.reducer'

const selectAuth = (state: RootState) => state.auth

export const selectSignUpData = createSelector([selectAuth], (auth) => ({
  email: auth.user.email,
  password: auth.user.password,
  nickName: auth.user.nickName,
  termsAgreements: auth.user.termsAgreements,
}))

export const selectEmail = createSelector(
  [selectAuth],
  (auth) => auth.user.email
)

export const selectPassword = createSelector(
  [selectAuth],
  (auth) => auth.user.password
)

export const selectIsLogin = createSelector(
  [selectAuth],
  (auth) => auth.isLogin
)

export const selectNickName = createSelector(
  [selectAuth],
  (auth) => auth.user.nickName
)

export const selectTermsAgreements = createSelector(
  [selectAuth],
  (auth) => auth.user.termsAgreements
)
