import { all } from 'redux-saga/effects'
import uiSaga from './ui/ui.saga'

function* rootSaga() {
  yield all([uiSaga()])
}

export default rootSaga
