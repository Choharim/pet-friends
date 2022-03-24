import axios, { AxiosError, AxiosResponse } from 'axios'
import { RECENT_KEYWORDS_KEY } from 'pages/search'
import {
  all,
  call,
  debounce,
  fork,
  put,
  SagaReturnType,
  select,
  takeLeading,
} from 'redux-saga/effects'
import { Food } from 'store/food/food.type'
import { selectRecentKeywords, selectSearchKeyword } from './search.selector'
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
  //TODO: 해당 키워드 클릭시/검색시 결과값 보여주기
  const res: AxiosResponse = yield axios.get(
    `http://localhost:5000/foods?name=${searchKeyword}&desc=${searchKeyword}`
  )
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

function* getSimilarName(searchKeyword: string) {
  try {
    const res: AxiosResponse<Food[]> = yield axios.get(
      `http://localhost:5000/foods?name_like=${searchKeyword}&_limit=10`
    )

    let names: string[] = []
    if (!!res.data.length) {
      names = res.data.map((data) => data.name)
    }

    return names
  } catch (error) {
    throw new Error((error as AxiosError).message)
  }
}

function* getSimilarIngredients(searchKeyword: string) {
  try {
    const res: AxiosResponse<Food[]> = yield axios.get(
      `http://localhost:5000/foods?ingredients_like=${searchKeyword}&_limit=10`
    )

    let ingredients: string[] = []
    if (!!res.data.length) {
      res.data.forEach((data) => {
        ingredients = data.ingredients.filter((ingredient) =>
          ingredient.includes(searchKeyword)
        )
      })
    }

    return ingredients
  } catch (error) {
    throw new Error((error as AxiosError).message)
  }
}

function* getSimilarKeywords() {
  // searchKeyword로 요리수업명이나, 상품명 자동 완성
  const searchKeyword: SagaReturnType<typeof selectSearchKeyword> =
    yield select(selectSearchKeyword)

  try {
    const [names, ingredients]: [names: string[], ingredients: string[]] =
      yield all([
        call(getSimilarName, searchKeyword),
        call(getSimilarIngredients, searchKeyword),
      ])

    const allFillterdData = [...names, ...ingredients]
    const uniqueData = allFillterdData.filter((data, i) => {
      return allFillterdData.indexOf(data) === i
    })

    yield put(searchActions.getSimilarKeywordsSuccess(uniqueData))
  } catch (error) {
    yield put(searchActions.getSimilarKeywordsFail(error as AxiosError))
  }
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

  yield debounce(200, searchActions.setSearchKeyword.type, getSimilarKeywords)

  yield takeLeading(searchActions.searchKeywordStart.type, searchForKeyword)
}

function* searchSaga() {
  yield all([fork(storeKeyword), fork(getStoredKeyword), fork(searchKeyword)])
}

export default searchSaga
