import { all } from 'redux-saga/effects'
import authSaga from './auth/auth.saga'
import uiSaga from './ui/ui.saga'

function* rootSaga() {
  yield all([uiSaga(), authSaga()])
}

export default rootSaga
