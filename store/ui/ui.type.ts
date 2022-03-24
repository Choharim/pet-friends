import { AsyncState } from 'store/utils/async'

export type ModalName = 'SignUpSuccess' | 'ReconfirmSignout'

export enum ToastDescKey {
  changePassword,
  changeOwnerInfo,
  apiError,
  alreadyOrdered,
  addToCart,
  allRequired,
  loginRequired,
}

export const TOAST_DESC_MAP = {
  [ToastDescKey.changePassword]: '비밀번호가 변경되었습니다.',
  [ToastDescKey.changeOwnerInfo]: '주인정보가 변경되었습니다.',
  [ToastDescKey.apiError]:
    '일시적인 오류가 발생했습니다. 잠시후에 다시 시도해주세요.',
  [ToastDescKey.alreadyOrdered]: '이미 주문된 상품입니다.',
  [ToastDescKey.addToCart]: '장바구니에 담았습니다.',
  [ToastDescKey.allRequired]: '필수항목을 모두 입력해주세요.',
  [ToastDescKey.loginRequired]: '로그인을 해주세요.',
} as const

export type UIState = {
  async: {
    getFoods: AsyncState
  }
  modals: ModalName[]
  toasts: Toast[]
}

export type Toast = { descKey: ToastDescKey; key: number }
