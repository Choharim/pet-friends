import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      [key in ColorsType]: string
    }
    fonts: {
      [key in FontsType]: {
        [key: string]: string | number
      }
    }
    media: {
      [key in MediaType]: string
    }
  }
}

type ColorsType =
  | 'MAIN_1'
  | 'MAIN_2'
  | 'MAIN_3'
  | 'MAIN_4'
  | 'MAIN_5'
  | 'WHITE'
  | 'BLACK_1'
  | 'BLACK_2'
  | 'BLACK_3'
  | 'BLACK_4'
  | 'BLACK_5'
  | 'GREY_1'
  | 'GREY_2'
  | 'GREY_3'
  | 'GREY_4'
  | 'GREY_5'
  | 'GREY_6'
  | 'GREY_7'
  | 'GREY_8'
  | 'WARNING'

type FontsType =
  | 'HEADER_1'
  | 'HEADER_2'
  | 'HEADER_3'
  | 'SUB_TITLE_1'
  | 'SUB_TITLE_2'
  | 'SUB_TITLE_3'
  | 'SUB_TITLE_4'
  | 'BODY_1'
  | 'BODY_2'
  | 'BODY_3'
  | 'BODY_4'
  | 'BODY_5'
  | 'BODY_6'

type MediaType = 'TABLET' | 'MOBILE'
