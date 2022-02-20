import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { FirebaseError } from 'firebase/app'
import { asyncState } from 'store/utils/async'
import { AuthState, initializeUser, TermsAgreement, User } from './auth.type'

const initialState: AuthState = {
  async: {
    signUp: asyncState.initial(),
    login: asyncState.initial(),
    persistUser: asyncState.initial(),
  },
  user: initializeUser(),

  isDuplicateNickName: false,
  isLogin: false,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, { payload }: PayloadAction<string>) => {
      state.user.email = payload
    },
    setPassword: (state, { payload }: PayloadAction<string>) => {
      state.user.password = payload
    },
    setNickName: (state, { payload }: PayloadAction<string>) => {
      state.user.nickName = payload
    },
    updateTermsAgreements: (
      state,
      { payload }: PayloadAction<TermsAgreement>
    ) => {
      state.user.termsAgreements = state.user.termsAgreements.map((agreement) =>
        agreement.field === payload.field ? payload : agreement
      )
    },
    setTermsAgreements: (state, { payload }: PayloadAction<boolean>) => {
      state.user.termsAgreements = state.user.termsAgreements.map(
        (agreement) => ({
          ...agreement,
          agree: payload,
        })
      )
    },
    setIsDuplicateNickName: (state, { payload }: PayloadAction<boolean>) => {
      state.isDuplicateNickName = payload
    },
    clearSignUp: (state) => {
      state.async.signUp = asyncState.initial()
      state.user = initializeUser()
      state.isDuplicateNickName = false
    },
    clearLogin: (state) => {
      state.async.login = asyncState.initial()
      state.user.email = ''
      state.user.password = ''
    },

    /**
     * @function async/signUp
     */
    signUpStart: (state) => {
      state.async.signUp = asyncState.load()
      state.isDuplicateNickName = false
    },
    signUpSuccess: (state) => {
      state.async.signUp = asyncState.success()
    },
    signUpFail: (
      state,
      { payload }: PayloadAction<AxiosError | FirebaseError>
    ) => {
      state.async.signUp = asyncState.error(payload)
    },

    /**
     * @function async/signIn
     */
    loginStart: (state) => {
      state.async.login = asyncState.load()
    },
    loginSuccess: (state, { payload }: PayloadAction<User>) => {
      state.async.login = asyncState.success()
      state.isLogin = true
      state.user = Object.assign(initializeUser(), payload)
    },
    loginFail: (
      state,
      { payload }: PayloadAction<AxiosError | FirebaseError>
    ) => {
      state.async.login = asyncState.error(payload)
    },

    /**
     * @function async/persistUser
     */
    persistUserStart: (state) => {
      state.async.persistUser = asyncState.load()
    },
    persistUserSuccess: (state, { payload }: PayloadAction<User>) => {
      state.async.persistUser = asyncState.success()
      state.isLogin = true
      state.user = Object.assign(initializeUser(), payload)
    },
    persistUserFail: (state, { payload }: PayloadAction<AxiosError>) => {
      state.async.persistUser = asyncState.error(payload)
    },
  },
})

export const authActions = auth.actions
export default auth.reducer
