import { AxiosError, AxiosResponse } from 'axios'
import FoodAPI from 'pages/api/food/axios'
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

function* controlAddRecentKeyword(searchKeyword: string) {
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

function* getSearchKeywordData({
  payload: searchKeyword,
}: ReturnType<typeof searchActions.getSearchKeywordStart>) {
  try {
    yield fork(controlAddRecentKeyword, searchKeyword)

    const [res1, res2]: AxiosResponse<Food[]>[] = yield all([
      call(FoodAPI.getLike, {
        field: 'name',
        keyword: searchKeyword,
      }),
      call(FoodAPI.getLike, {
        field: 'ingredients',
        keyword: searchKeyword,
      }),
    ])

    const searchResults = [...res1.data, ...res2.data]

    yield put(searchActions.getSearchKeywordSuccess(searchResults))
  } catch (error) {
    yield put(searchActions.getSearchKeywordFail(error as AxiosError))
  }
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
    const res: AxiosResponse<Food[]> = yield call(FoodAPI.getLike, {
      field: 'name',
      keyword: searchKeyword,
    })

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
    const res: AxiosResponse<Food[]> = yield call(FoodAPI.getLike, {
      field: 'ingredients',
      keyword: searchKeyword,
    })

    let ingredients: string[] = []
    if (!!res.data.length) {
      res.data.forEach((data) => {
        const similarIngredient = data.ingredients.filter((ingredient) =>
          ingredient.includes(searchKeyword)
        )

        ingredients = [...ingredients, ...similarIngredient]
      })
    }

    return ingredients
  } catch (error) {
    throw new Error((error as AxiosError).message)
  }
}

function* getSimilarKeywords() {
  /**
   * searchKeyword로 요리수업명이나, 상품명 자동 완성
   * 최대 10개까지 보여줌
   */
  const searchKeyword: SagaReturnType<typeof selectSearchKeyword> =
    yield select(selectSearchKeyword)

  if (!!searchKeyword) {
    yield put(searchActions.clearSearchResults())
  }

  try {
    const [names, ingredients]: [names: string[], ingredients: string[]] =
      yield all([
        call(getSimilarName, searchKeyword),
        call(getSimilarIngredients, searchKeyword),
      ])

    const allFillterdData = [...names, ...ingredients]
    const uniqueDataUpToTen = allFillterdData
      .filter((data, i) => {
        return allFillterdData.indexOf(data) === i
      })
      .slice(0, 10)

    if (!searchKeyword) return

    yield put(searchActions.getSimilarKeywordsSuccess(uniqueDataUpToTen))
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
  yield debounce(100, searchActions.setSearchKeyword.type, getSimilarKeywords)
  yield takeLeading(
    searchActions.getSearchKeywordStart.type,
    getSearchKeywordData
  )
}

function* searchSaga() {
  yield all([fork(storeKeyword), fork(getStoredKeyword), fork(searchKeyword)])
}

export default searchSaga
