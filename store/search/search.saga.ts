import { RECENT_KEYWORDS_KEY } from 'pages/search'
import {
  all,
  debounce,
  fork,
  put,
  SagaReturnType,
  select,
  takeLeading,
} from 'redux-saga/effects'
import { selectRecentKeywords } from './search.selector'
import { searchActions } from './search.slice'
import { RecentKeyword } from './search.type'

function* controlAddRecentKeyword({
  payload: { searchKeyword },
}: ReturnType<typeof searchActions.searchKeywordStart>) {
  const recentKeywords: SagaReturnType<typeof selectRecentKeywords> =
    yield select(selectRecentKeywords)

  const trimedSearchKeyword = searchKeyword.trim()

  //가장 최근에 검색한 키워드와 동일할 경우, 실행하지 않음
  if (
    !trimedSearchKeyword ||
    (!!recentKeywords.length &&
      recentKeywords[recentKeywords.length - 1].keyword === trimedSearchKeyword)
  )
    return

  const keyword: RecentKeyword = {
    id: new Date().getTime(),
    keyword: trimedSearchKeyword,
  }

  yield put(searchActions.addRecentKeyword(keyword))
}

function* searchForKeyword({
  payload: { searchKeyword },
}: ReturnType<typeof searchActions.searchKeywordStart>) {
  //TODO: searchKeyword로 요리수업명이나, 상품명, 상품 설명에 포함되어있는 거 데이터 가져오기
}

function* setKeywordInLocalStorage() {
  const recentKeywords: SagaReturnType<typeof selectRecentKeywords> =
    yield select(selectRecentKeywords)

  localStorage.setItem(RECENT_KEYWORDS_KEY, JSON.stringify(recentKeywords))
}

function* clearKeywordInLocalStorage() {
  localStorage.removeItem(RECENT_KEYWORDS_KEY)
}

function* getStoredKeywordInLocalStorage() {
  const stringifiedKeywords = localStorage.getItem(RECENT_KEYWORDS_KEY)

  if (!stringifiedKeywords) return

  const recentKeywords: RecentKeyword[] = JSON.parse(stringifiedKeywords)

  yield put(searchActions.setRecentKeywords(recentKeywords))
}

function* autoRecommendationKeyword() {
  // searchKeyword로 요리수업명이나, 상품명 자동 완성
}

function* storeKeyword() {
  yield takeLeading(
    searchActions.addRecentKeyword.type,
    setKeywordInLocalStorage
  )
  yield takeLeading(
    searchActions.deleteRecentKeyword.type,
    setKeywordInLocalStorage
  )
  yield takeLeading(
    searchActions.clearRecentKeyword,
    clearKeywordInLocalStorage
  )
}

function* getStoredKeyword() {
  yield takeLeading(
    searchActions.getRecentKeywordsInLocalStorage.type,
    getStoredKeywordInLocalStorage
  )
}

function* searchKeyword() {
  yield takeLeading(
    searchActions.searchKeywordStart.type,
    controlAddRecentKeyword
  )

  yield debounce(
    200,
    searchActions.setSearchKeyword.type,
    autoRecommendationKeyword
  )

  yield takeLeading(searchActions.searchKeywordStart.type, searchForKeyword)
}

function* searchSaga() {
  yield all([fork(storeKeyword), fork(getStoredKeyword), fork(searchKeyword)])
}

export default searchSaga
