export type ModalName = 'SignUpSuccess' | 'ReconfirmAccountWithdrawal'

export const TOAST_KEY = {
  changePassword: '비밀번호가 변경되었습니다.',
  changeOwnerInfo: '주인정보가 변경되었습니다.',
} as const

export type Toast = {
  key: typeof TOAST_KEY[keyof typeof TOAST_KEY]
}
export type UIState = {
  modals: ModalName[]
  toasts: Toast[]
}
