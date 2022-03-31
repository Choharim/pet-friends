import { pageNames } from 'constants/common'
import Router from 'next/router'
import {
  all,
  fork,
  put,
  race,
  SagaReturnType,
  select,
  take,
  takeLeading,
} from 'redux-saga/effects'
import { selectIsLogin } from 'store/auth/auth.selector'
import { authActions } from 'store/auth/auth.slice'
import { uiActions } from 'store/ui/ui.slice'
import { ToastDescKey } from 'store/ui/ui.type'
import { systemActions } from './system.slice'

function* loginGuard() {
  const isLogin: SagaReturnType<typeof selectIsLogin> = yield select(
    selectIsLogin
  )

  if (!isLogin) {
    const [persistUserSuccess, persistUserFail]: [
      persistUserSuccess: SagaReturnType<typeof authActions.persistUserSuccess>,
      persistUserFail: SagaReturnType<typeof authActions.persistUserFail>
    ] = yield race([
      take(authActions.persistUserSuccess.type),
      take(authActions.persistUserFail.type),
    ])

    if (persistUserFail) {
      Router.push(pageNames.HOME)
      yield put(
        uiActions.showToast({
          descKey: ToastDescKey.loginRequired,
          key: new Date().getTime(),
        })
      )
    }
  }

  yield put(systemActions.loginGuardSuccess())
}

function* guard() {
  yield takeLeading(systemActions.loginGuardStart.type, loginGuard)
}

function* systemSaga() {
  yield all([fork(guard)])
}

export default systemSaga
