export type SearchState = {
  searchKeyword: string
  recentKeywords: RecentKeyword[]
}

export type RecentKeyword = {
  id: number
  keyword: string
}
