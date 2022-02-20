import axios, { AxiosError, AxiosResponse } from 'axios'
import { LOCALSTORAGE_USER_KEY } from 'constants/auth'
import { pageNames } from 'constants/common'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
} from 'firebase/auth'
import Router from 'next/router'
import {
  all,
  call,
  fork,
  put,
  SagaReturnType,
  select,
  take,
  takeLeading,
} from 'redux-saga/effects'
import { selectSignUpData, selectUser } from './auth.selector'
import { authActions } from './auth.slice'
import { User } from './auth.type'

/**
 *
 * @function signUp
 */
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

/**
 *@function login
 */
function* getUserDataInDB(id: string) {
  const res: AxiosResponse = yield axios.get(
    `http://localhost:5000/users?id=${id}`
  )

  return res.data?.[0]
}

function* firebaseFignIn() {
  try {
    const user: SagaReturnType<typeof selectUser> = yield select(selectUser)

    // firebase 로그인
    const auth = getAuth()
    const res: UserCredential = yield signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )

    // user data 가져옴
    const userData: User = yield call(getUserDataInDB, res.user.uid)

    // 로그인했을 경우 새로고침해도 로그인을 유지하기 위해 user id localStorage에 저장
    yield call([localStorage, 'setItem'], LOCALSTORAGE_USER_KEY, userData.id)

    /**
     * login 페이지 이탈시 user email/password가 초기화되기 때문에
     * clearLogin action이 끝나길 기다린 후 loginSuccess로 로그인 유저 정보 set함
     * */
    yield call(Router.push, pageNames.HOME)
    yield take(authActions.clearLogin.type)

    yield put(authActions.loginSuccess(userData))
  } catch (error) {
    yield put(authActions.loginFail(error as AxiosError | FirebaseError))

    const user = getAuth().currentUser
    if (!!user) {
      const auth = getAuth()
      yield signOut(auth)
    }
  }
}

function* persistUser() {
  try {
    const userId: string = yield call(
      [localStorage, 'getItem'],
      LOCALSTORAGE_USER_KEY
    )

    if (!!userId) {
      const userData: User = yield call(getUserDataInDB, userId)

      yield put(authActions.persistUserSuccess(userData))
    }
  } catch (error) {
    yield put(authActions.persistUserFail(error as AxiosError))
  }
}

function* signUp() {
  yield takeLeading(authActions.signUpStart.type, firebaseSignUp)
}

function* login() {
  yield takeLeading(authActions.loginStart.type, firebaseFignIn)
  yield takeLeading(authActions.persistUserStart.type, persistUser)
}

function* authSaga() {
  yield all([fork(signUp), fork(login)])
}

export default authSaga
