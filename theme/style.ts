import { Theme } from '@emotion/react'
import { deviceSizes } from '../constants/common'

export const theme: Theme = {
  colors: {
    MAIN_1: '#a7c1e1',
    MAIN_2: '#8caed8',
    MAIN_3: '#719ccf',
    MAIN_4: '#5689c6',
    MAIN_5: '#3e77bb',
    WHITE: '#FFFFFF',
    BLACK_1: '#4d4d4d',
    BLACK_2: '#3c3c3c',
    BLACK_3: '#1e1e1e',
    BLACK_4: '#111111',
    BLACK_5: '#000000',
    GREY_1: '#f6f6f6',
    GREY_2: '#ececec',
    GREY_3: '#e1e1e1',
    GREY_4: '#c0c3c8',
    GREY_5: '#adb2b7',
    GREY_6: '#9aa0a7',
    GREY_7: '#878e96',
    GREY_8: '#747c85',
    WARNING: '#fa5963',
  },
  fonts: {
    HEADER_1: {
      fontSize: '32px',
      lineHeight: '42px',
      fontWeight: 700,
    },
    HEADER_2: {
      fontSize: '28px',
      lineHeight: '40px',
      fontWeight: 700,
    },
    HEADER_3: {
      fontSize: '28px',
      lineHeight: '38px',
      fontWeight: 500,
    },
    SUB_TITLE_1: {
      fontSize: '22px',
      lineHeight: '27px',
      fontWeight: 600,
    },
    SUB_TITLE_2: {
      fontSize: '18px',
      lineHeight: '26px',
      fontWeight: 600,
    },
    SUB_TITLE_3: {
      fontSize: '16px',
      lineHeight: '26px',
      fontWeight: 500,
    },
    BODY_1: {
      fontSize: '16px',
      lineHeight: '26px',
      fontWeight: 500,
    },
    BODY_2: {
      fontSize: '14px',
      lineHeight: '20px',
    },
    BODY_3: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    BODY_4: {
      fontSize: '13px',
      lineHeight: '20px',
      fontWeight: 500,
    },
    BODY_5: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 300,
    },
    BODY_6: {
      fontSize: '11px',
      lineHeight: '15px',
      fontWeight: 300,
    },
  },
  media: {
    TABLET: `@media (max-width: ${deviceSizes.MAX_TABLET_SIZE}px)`,
    MOBILE: `@media (max-width: ${deviceSizes.MAX_MOBILE_SIZE}px)`,
  },
}
