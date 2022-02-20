import { TermsAgreement } from 'store/auth/auth.type'

export const WarningText = {
  required: '필수 입력 항목입니다.',
}

export const TERMS_AGREEMENTS: {
  field: TermsAgreement['field']
  required: boolean
  desc: string
}[] = [
  { field: 'terms-of-use', required: true, desc: '이용약관' },
  {
    field: 'collection-of-personal-information',
    required: true,
    desc: '개인정보수집 및 이용동의',
  },
  {
    field: 'event-notification',
    required: false,
    desc: '이벤트, 프로모션 알림 메일 및 SMS 수신',
  },
]

export const LOCALSTORAGE_USER_KEY = 'pet-friends_id'

export const FirebaseErrorCode = {
  invalidPassword: 'auth/wrong-password',
  notFoundUser: 'auth/user-not-found',
}
