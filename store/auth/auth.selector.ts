import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/root.reducer'

const selectAuth = (state: RootState) => state.auth

export const selectUser = createSelector([selectAuth], (auth) => auth.user)

export const selectSignUpData = createSelector([selectUser], (user) => ({
  email: user.email,
  password: user.password,
  nickName: user.nickName,
  termsAgreements: user.termsAgreements,
}))

export const selectEmail = createSelector([selectUser], (user) => user.email)

export const selectPassword = createSelector(
  [selectUser],
  (user) => user.password
)

export const selectNickName = createSelector(
  [selectUser],
  (user) => user.nickName
)

export const selectTermsAgreements = createSelector(
  [selectUser],
  (user) => user.termsAgreements
)

export const selectProfileUrl = createSelector(
  [selectUser],
  (user) => user.profileUrl
)

export const selectIsDuplicateNickName = createSelector(
  [selectAuth],
  (auth) => auth.isDuplicateNickName
)

export const selectIsLogin = createSelector(
  [selectAuth],
  (auth) => auth.isLogin
)

/**
 * @function async
 */
const selectAsync = createSelector([selectAuth], (auth) => auth.async)

export const selectLoginAsync = createSelector(
  [selectAsync],
  (async) => async.login
)

export const selectSignUpAsync = createSelector(
  [selectAsync],
  (async) => async.signUp
)

export const selectSignoutAsync = createSelector(
  [selectAsync],
  (async) => async.signout
)

export const selectPersistUserAsync = createSelector(
  [selectAsync],
  (async) => async.persistUser
)
