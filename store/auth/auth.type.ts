export type AuthState = {
  email: string
  password: string
  nickName: string
  profileUrl: string
  phoneNumber: number
  isLogin: boolean
  termsAgreements: TermsAgreement[]
}

export type TermsAgreement = {
  field:
    | 'terms-of-use'
    | 'event-notification'
    | 'collection-of-personal-information'
  agree: boolean
  updated: number
}
