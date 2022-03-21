import { RECENT_KEYWORDS_KEY } from 'pages/search'
import {
  all,
  call,
  fork,
  put,
  SagaReturnType,
  select,
  takeLeading,
} from 'redux-saga/effects'
import { selectRecentKeywords, selectSearchKeyword } from './search.selector'
import { searchActions } from './search.slice'
import { RecentKeyword } from './search.type'

function* setKeywordInLocalStorage() {
  const searchKeyword: SagaReturnType<typeof selectSearchKeyword> =
    yield select(selectSearchKeyword)
  const recentKeywords: SagaReturnType<typeof selectRecentKeywords> =
    yield select(selectRecentKeywords)

  //가장 최근에 검색한 키워드와 동일할 경우, 실행하지 않음
  if (
    !!recentKeywords.length &&
    recentKeywords[recentKeywords.length - 1].keyword === searchKeyword
  )
    return

  const keyword: RecentKeyword = {
    id: new Date().getTime(),
    keyword: searchKeyword,
  }

  localStorage.setItem(
    RECENT_KEYWORDS_KEY,
    JSON.stringify([...recentKeywords, keyword])
  )
  yield put(searchActions.addRecentKeyword(keyword))
}

function* getStoredKeywordInLocalStorage() {
  const strifiedKeywords = localStorage.getItem(RECENT_KEYWORDS_KEY)

  if (!strifiedKeywords) return

  const recentKeywords: RecentKeyword[] = JSON.parse(strifiedKeywords)

  yield put(searchActions.setRecentKeywords(recentKeywords))
}

function* storeKeyword() {
  yield takeLeading(
    searchActions.searchKeywordStart.type,
    setKeywordInLocalStorage
  )
}

function* getStoredKeyword() {
  yield takeLeading(
    searchActions.getRecentKeywordsInLocalStorage.type,
    getStoredKeywordInLocalStorage
  )
}

function* searchSaga() {
  yield all([fork(storeKeyword), fork(getStoredKeyword)])
}

export default searchSaga
