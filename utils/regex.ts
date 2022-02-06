export const checkEmailFormat = (email: string): boolean => {
  const emailRegex = /\S+@\S+\.\S+/
  return emailRegex.test(email)
}

export const checkPasswordFormat = (password: string): boolean => {
  const passwordRegex = /^[a-zA-Z0-9]{8,20}$/

  return passwordRegex.test(password)
}

export const checkPhoneNumberFormat = (phoeNumber: string): boolean => {
  const phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/

  return phoneNumberRegex.test(phoeNumber)
}
