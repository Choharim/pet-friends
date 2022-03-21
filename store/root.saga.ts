import { all } from 'redux-saga/effects'
import authSaga from './auth/auth.saga'
import searchSaga from './search/search.saga'
import systemSaga from './system/system.saga'
import uiSaga from './ui/ui.saga'

function* rootSaga() {
  yield all([uiSaga(), authSaga(), systemSaga(), searchSaga()])
}

export default rootSaga
