import axios, { AxiosError } from 'axios'
import { pageNames } from 'constants/common'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  UserCredential,
} from 'firebase/auth'
import Router from 'next/router'
import {
  all,
  call,
  fork,
  put,
  SagaReturnType,
  select,
  takeLeading,
} from 'redux-saga/effects'
import { selectSignUpData } from './auth.selector'
import { authActions } from './auth.slice'
import { User } from './auth.type'

function* setUserDataInDB(user: User) {
  yield axios.post(`http://localhost:5000/users`, user)
}

function* firebaseSignUp() {
  try {
    const signUpData: SagaReturnType<typeof selectSignUpData> = yield select(
      selectSignUpData
    )

    const auth = getAuth()
    const res: UserCredential = yield createUserWithEmailAndPassword(
      auth,
      signUpData.email,
      signUpData.password
    )

    yield call(setUserDataInDB, { ...signUpData, id: res.user.uid })

    yield put(authActions.signUpSuccess())

    Router.push(pageNames.LOGIN)
  } catch (error) {
    const user = getAuth().currentUser
    if (!!user) {
      yield deleteUser(user)
    }

    yield put(authActions.signUpFail(error as AxiosError))
  }
}

function* signUp() {
  yield takeLeading(authActions.signUpStart.type, firebaseSignUp)
}

function* authSaga() {
  yield all([fork(signUp)])
}

export default authSaga
