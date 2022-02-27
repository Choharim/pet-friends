import axios, { AxiosError, AxiosResponse } from 'axios'
import { FirebaseErrorCode, LOCALSTORAGE_USER_KEY } from 'constants/auth'
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
import { uiActions } from 'store/ui/ui.slice'
import { ToastDescKey } from 'store/ui/ui.type'
import { selectSignUpData, selectUser } from './auth.selector'
import { authActions } from './auth.slice'
import { User } from './auth.type'

function* LogoutByFirebase() {
  const user = getAuth().currentUser
  if (!!user) {
    const auth = getAuth()
    yield signOut(auth)
  }
}
/**
 *
 * @function signUp
 */
function* setUserDataInDB(user: User) {
  try {
    yield axios.post(`http://localhost:5000/users`, user)
  } catch (error) {
    throw new Error((error as AxiosError).message)
  }
}

function* checkDuplicatedNickName(nickName: string) {
  try {
    const res: AxiosResponse = yield axios.get(
      `http://localhost:5000/users?nickName=${nickName}`
    )

    let isDuplicateNickName = false

    if (!!res.data?.length) {
      yield put(authActions.setIsDuplicateNickName(true))
      isDuplicateNickName = true
    }

    return isDuplicateNickName
  } catch (error) {
    throw new Error((error as AxiosError).message)
  }
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

    if (
      error &&
      (error as FirebaseError)?.code !== FirebaseErrorCode.existUser
    ) {
      yield put(
        uiActions.showToast({
          key: new Date().getTime(),
          descKey: ToastDescKey.apiError,
        })
      )
    }

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
  try {
    const res: AxiosResponse = yield axios.get(
      `http://localhost:5000/users?id=${id}`
    )

    return res.data?.[0]
  } catch (error) {
    throw new Error((error as AxiosError).message)
  }
}

function* firebaseLogin() {
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
    yield call([localStorage, 'setItem'], LOCALSTORAGE_USER_KEY, res.user.uid)

    /**
     * login 페이지 이탈시 user email/password가 초기화되기 때문에
     * clearLogin action이 끝나길 기다린 후 loginSuccess로 로그인 유저 정보 set함
     * */
    yield call(Router.push, pageNames.HOME)
    yield take(authActions.clearLogin.type)

    yield put(authActions.loginSuccess(userData))
  } catch (error) {
    yield put(authActions.loginFail(error as AxiosError | FirebaseError))

    if (
      error &&
      (error as FirebaseError)?.code !== FirebaseErrorCode.invalidPassword &&
      (error as FirebaseError)?.code !== FirebaseErrorCode.notFoundUser
    ) {
      yield put(
        uiActions.showToast({
          key: new Date().getTime(),
          descKey: ToastDescKey.apiError,
        })
      )
    }

    yield call(LogoutByFirebase)
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

function* firebaseLogout() {
  try {
    yield call(LogoutByFirebase)

    yield call([localStorage, 'removeItem'], LOCALSTORAGE_USER_KEY)

    yield put(authActions.logoutSuccess())
  } catch (error) {
    yield put(authActions.logoutFail(error as AxiosError))
  }
}

function* signUp() {
  yield takeLeading(authActions.signUpStart.type, firebaseSignUp)
}

function* login() {
  yield takeLeading(authActions.loginStart.type, firebaseLogin)
  yield takeLeading(authActions.persistUserStart.type, persistUser)
}

function* logout() {
  yield takeLeading(authActions.logoutStart.type, firebaseLogout)
}

function* authSaga() {
  yield all([fork(signUp), fork(login), fork(logout)])
}

export default authSaga
