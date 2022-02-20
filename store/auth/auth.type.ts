import { AsyncState } from 'store/utils/async'

type AuthAsync = 'signUp'

export type AuthState = {
  async: { [key in AuthAsync]: AsyncState }
  user: User
  isDuplicateNickName: boolean
  isLogin: boolean
}

export type User = {
  id: string
  email: string
  password: string
  nickName: string
  termsAgreements: TermsAgreement[]
  profileUrl?: string
  phoneNumber?: number
}

export type TermsAgreement = {
  field:
    | 'terms-of-use'
    | 'event-notification'
    | 'collection-of-personal-information'
  agree: boolean
}

export const initializeTermsAgreements = (): TermsAgreement[] => [
  { field: 'terms-of-use', agree: false },
  {
    field: 'collection-of-personal-information',
    agree: false,
  },
  { field: 'event-notification', agree: false },
]

export const initializeUser = (): User =>
  Object.assign(
    {},
    {
      id: '',
      email: '',
      password: '',
      nickName: '',
      profileUrl: '',
      phoneNumber: 0,
      termsAgreements: initializeTermsAgreements(),
    }
  )
