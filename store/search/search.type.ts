import { AsyncState } from 'store/utils/async'

type SearchAsync = 'getSimilarKeywords'

export type SearchState = {
  async: { [key in SearchAsync]: AsyncState }
  searchKeyword: string
  recentKeywords: RecentKeyword[]
  similarKeywords: string[]
}

export type RecentKeyword = {
  id: number
  keyword: string
}
