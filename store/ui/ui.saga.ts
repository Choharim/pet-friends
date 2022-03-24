import { TOAST_TIMEOUT } from 'components/toast/toast-container'
import {
  all,
  delay,
  fork,
  put,
  SagaReturnType,
  select,
  takeEvery,
} from 'redux-saga/effects'
import { selectToasts } from './ui.selector'
import { uiActions } from './ui.slice'

function* controlAutoModalClose({
  payload,
}: ReturnType<typeof uiActions.showModal>) {
  const { modalName, timout } = payload

  if (timout) {
    yield delay(timout)
    yield put(uiActions.showModal({ modalName }))
  }
}

function* controlAutoToastClose({
  payload,
}: ReturnType<typeof uiActions.showToast>) {
  const { key, descKey } = payload

  const toasts: SagaReturnType<typeof selectToasts> = yield select(selectToasts)
  if (!!toasts.find((toast) => toast?.descKey === descKey)) return

  yield put(uiActions.addToast(payload))
  yield delay(TOAST_TIMEOUT)
  yield put(uiActions.clearToast(key))
}

function* controlModal() {
  yield takeEvery(uiActions.showModal.type, controlAutoModalClose)
}
function* controlToast() {
  yield takeEvery(uiActions.showToast.type, controlAutoToastClose)
}

function* uiSaga() {
  yield all([fork(controlModal), fork(controlToast)])
}

export default uiSaga
