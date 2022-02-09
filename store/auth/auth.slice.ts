import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './auth.type'

const initialState: AuthState = {
  email: '',
  password: '',
  nickName: '',
  profileUrl: '',
  phoneNumber: 0,
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
  },
})

export const authActions = auth.actions
export default auth.reducer
