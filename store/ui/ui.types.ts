export type ModalName = 'SignUpSuccess' | 'ReconfirmAccountWithdrawal'

export enum ToastDescKey {
  changePassword,
  changeOwnerInfo,
  apiError,
}

export const TOAST_DESC_MAP = {
  [ToastDescKey.changePassword]: '비밀번호가 변경되었습니다.',
  [ToastDescKey.changeOwnerInfo]: '주인정보가 변경되었습니다.',
  [ToastDescKey.apiError]:
    '일시적인 오류가 발생했습니다. 잠시후에 다시 시도해주세요.',
} as const

export type UIState = {
  modals: ModalName[]
  toasts: Toast[]
}

export type Toast = { descKey: ToastDescKey; key: number }
