import axios, { AxiosError, AxiosResponse } from 'axios'
import { pageNames } from 'constants/common'
import { FirebaseError } from 'firebase/app'
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

function* checkDuplicatedNickName(nickName: string) {
  const res: AxiosResponse = yield axios.get(
    `http://localhost:5000/users?nickName=${nickName}`
  )

  let isDuplicateNickName = false

  if (!!res.data?.length) {
    yield put(authActions.setIsDuplicateNickName(true))
    isDuplicateNickName = true
  }

  return isDuplicateNickName
}

function* firebaseSignUp() {
  try {
    const signUpData: SagaReturnType<typeof selectSignUpData> = yield select(
      selectSignUpData
    )

    // nickName 중복체크
    const isDuplicateNickName: boolean = yield call(
      checkDuplicatedNickName,
      signUpData.nickName
    )

    if (isDuplicateNickName) {
      return
    }

    // firebase 회원가입
    const auth = getAuth()
    const res: UserCredential = yield createUserWithEmailAndPassword(
      auth,
      signUpData.email,
      signUpData.password
    )

    // user data 저장
    yield call(setUserDataInDB, { ...signUpData, id: res.user.uid })

    yield put(authActions.signUpSuccess())
    Router.push(pageNames.LOGIN)
  } catch (error) {
    yield put(authActions.signUpFail(error as AxiosError | FirebaseError))

    const user = getAuth().currentUser
    if (!!user) {
      yield deleteUser(user)
    }
  }
}

function* signUp() {
  yield takeLeading(authActions.signUpStart.type, firebaseSignUp)
}

function* authSaga() {
  yield all([fork(signUp)])
}

export default authSaga
