import { Food } from 'store/food/food.type'
import { AsyncState } from 'store/utils/async'

type SearchAsync = 'getSimilarKeywords' | 'searchKeyword'

export type SearchState = {
  async: { [key in SearchAsync]: AsyncState }
  searchKeyword: string
  recentKeywords: RecentKeyword[]
  similarKeywords: string[]
  foodResults: Food[]
}

export type RecentKeyword = {
  id: number
  keyword: string
}
