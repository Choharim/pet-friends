import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { uiActions } from 'store/ui/ui.slice'
import { ToastDescKey } from 'store/ui/ui.type'
import { checkEmailFormat, checkPasswordFormat } from 'utils'
import { selectSignUpAsync, selectSignUpData } from 'store/auth/auth.selector'
import { TERMS_AGREEMENTS } from 'constants/auth'
import { authActions } from 'store/auth/auth.slice'

import Button from 'components/button/button'
import CircleSpiner from 'components/spiner/circle-spiner'

const Confirm = () => {
  const dispatch = useDispatch()
  const { email, password, nickName, termsAgreements } =
    useSelector(selectSignUpData)
  const { loading } = useSelector(selectSignUpAsync)

  const goToSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (loading) return

    if (
      !checkEmailFormat(email) ||
      !checkPasswordFormat(password) ||
      nickName.trim().length < 2 ||
      termsAgreements.some(
        (ta) =>
          TERMS_AGREEMENTS.find((taData) => taData.field === ta.field)
            ?.required && !ta.agree
      )
    ) {
      dispatch(
        uiActions.showToast({
          descKey: ToastDescKey.allRequired,
          key: new Date().getTime(),
        })
      )

      return
    }

    dispatch(authActions.signUpStart())
  }

  return (
    <Button themeColor="MAIN_5" onClick={goToSignUp}>
      회원가입하기
      {loading && <CircleSpiner />}
    </Button>
  )
}

export default React.memo(Confirm)
