import { all, delay, fork, put, select, takeEvery } from 'redux-saga/effects'
import * as uiActions from './ui.slice'
import { selectToasts } from './ui.selector'

function* controlAutoModalClose({
  payload,
}: ReturnType<typeof uiActions.showModal>) {
  const { modalName, timout } = payload

  if (timout) {
    yield delay(timout)
    yield put(uiActions.showModal({ modalName }))
  }
}

function* controlAutoToastClose() {
  yield delay(2500)
  yield put(uiActions.clearToast())
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
