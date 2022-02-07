import { all, delay, fork, put, select, takeEvery } from 'redux-saga/effects'
import * as uiActions from './ui.slice'
import { selectToasts } from './ui.selector'

function* controlAutoModalClose({
  payload,
}: ReturnType<typeof uiActions.toggleModal>) {
  const { modalName, timout } = payload

  if (timout) {
    yield delay(timout)
    yield put(uiActions.toggleModal({ modalName }))
  }
}

function* controlAutoToastClose({
  payload,
}: ReturnType<typeof uiActions.showToast>) {
  const { key } = payload

  const toasts: ReturnType<typeof selectToasts> = yield select(selectToasts)
  if (toasts.length && toasts.some((toast) => toast.key === key)) return

  yield put(uiActions.addToast({ key }))
  yield delay(3000)
  yield put(uiActions.clearToast({ key }))
}

function* controlModal() {
  yield takeEvery(uiActions.toggleModal.type, controlAutoModalClose)
}
function* controlToast() {
  yield takeEvery(uiActions.showToast.type, controlAutoToastClose)
}

function* uiSaga() {
  yield all([fork(controlModal), fork(controlToast)])
}

export default uiSaga
