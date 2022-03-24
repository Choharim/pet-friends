export const dotFormat = (timezone: number) => {
  const nowYear = new Date().getFullYear()
  const date = new Date(timezone)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const fommatedDate = `${year !== nowYear ? `${year}.` : ''}${
    month < 10 ? 0 : ''
  }${month}.${day < 10 ? 0 : ''}${day}`

  return fommatedDate
}
