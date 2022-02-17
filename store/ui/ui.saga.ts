import axios, { AxiosError, AxiosResponse } from 'axios'
import {
  all,
  delay,
  fork,
  put,
  select,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects'
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

function* controlAutoToastClose() {
  yield delay(2500)
  yield put(uiActions.clearToast())
}

function* getFood() {
  try {
    const response: AxiosResponse = yield axios.get(
      'http://localhost:5000/foods'
    )

    yield put(uiActions.getFoodsSuccess(response.data))
  } catch (error) {
    yield put(uiActions.getFoodsFail(error as AxiosError))
  }
}

function* controlModal() {
  yield takeEvery(uiActions.showModal.type, controlAutoModalClose)
}
function* controlToast() {
  yield takeEvery(uiActions.showToast.type, controlAutoToastClose)
}

function* getData() {
  yield takeLeading(uiActions.getFoodsStart.type, getFood)
}

function* uiSaga() {
  yield all([fork(controlModal), fork(controlToast), fork(getData)])
}

export default uiSaga
