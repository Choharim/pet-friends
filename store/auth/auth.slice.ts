import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { FirebaseError } from 'firebase/app'
import { asyncState } from 'store/utils/async'
import { AuthState, initializeUser, TermsAgreement } from './auth.type'

const initialState: AuthState = {
  async: {
    signUp: asyncState.initial(),
    setUserData: asyncState.initial(),
  },
  isLogin: false,
  user: initializeUser(),
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
    clearSignUp: (state) => {
      state.user = initializeUser()
    },

    signUpStart: (state) => {
      state.async.signUp = asyncState.load()
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
