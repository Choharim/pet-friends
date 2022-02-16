import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, TermsAgreement } from './auth.type'

const initialState: AuthState = {
  isLogin: false,
  email: '',
  password: '',
  nickName: '',
  profileUrl: '',
  phoneNumber: 0,
  termsAgreements: [
    { field: 'terms-of-use', agree: false, updated: 0 },
    {
      field: 'collection-of-personal-information',
      agree: false,
      updated: 0,
    },
    { field: 'event-notification', agree: false, updated: 0 },
  ],
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload
    },
    setPassword: (state, { payload }: PayloadAction<string>) => {
      state.password = payload
    },
    setNickName: (state, { payload }: PayloadAction<string>) => {
      state.nickName = payload
    },
    updateTermsAgreements: (
      state,
      { payload }: PayloadAction<TermsAgreement>
    ) => {
      state.termsAgreements = state.termsAgreements.map((agreement) =>
        agreement.field === payload.field ? payload : agreement
      )
    },
    setTermsAgreements: (state, { payload }: PayloadAction<boolean>) => {
      state.termsAgreements = state.termsAgreements.map((agreement) => ({
        ...agreement,
        agree: payload,
      }))
    },
  },
})

export const authActions = auth.actions
export default auth.reducer
