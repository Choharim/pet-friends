import React from 'react'
import AlertDialog from './alert-dialog'
import { ModalProps } from './modal-container'
import { authActions } from 'store/auth/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignoutAsync } from 'store/auth/auth.selector'
import { ErrorMessages } from 'constants/auth'

const ReconfirmSignout = ({ onClose }: ModalProps) => {
  const dispatch = useDispatch()
  const { error } = useSelector(selectSignoutAsync)

  const leaveAccount = () => {
    dispatch(authActions.signoutStart())
  }

  const errorText = () => {
    if (error) {
      return '회원탈퇴에 문제가 생겼어요. \n잠시후에 시도해주세요.'
    }
    return ''
  }

  return (
    <AlertDialog
      title="정말로 탈퇴하시겠습니까?"
      onClickCancelButton={onClose}
      onClickConfirmButton={leaveAccount}
      error={errorText()}
    />
  )
}

export default ReconfirmSignout
