export const makePhoneNumberFormat = (phoneNumber: string) => {
  let formatedPhoneNumber = phoneNumber.replaceAll('-', '')

  if (formatedPhoneNumber.length > 7) {
    formatedPhoneNumber = `${formatedPhoneNumber.slice(
      0,
      3
    )}-${formatedPhoneNumber.slice(3, 7)}-${formatedPhoneNumber.slice(7, 11)}`
  } else if (formatedPhoneNumber.length > 3) {
    formatedPhoneNumber = `${formatedPhoneNumber.slice(
      0,
      3
    )}-${formatedPhoneNumber.slice(3, 7)}`
  }

  return formatedPhoneNumber
}
