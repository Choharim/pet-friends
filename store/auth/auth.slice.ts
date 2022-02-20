import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { FirebaseError } from 'firebase/app'
import { asyncState } from 'store/utils/async'
import { AuthState, initializeUser, TermsAgreement } from './auth.type'

const initialState: AuthState = {
  async: {
    signUp: asyncState.initial(),
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
  },
})

export const authActions = auth.actions
export default auth.reducer
