import React from 'react'
import AlertDialog from './alert-dialog'
import { ModalProps } from './modal-container'
import { authActions } from 'store/auth/auth.slice'
import { useDispatch } from 'react-redux'

const ReconfirmSignout = ({ onClose }: ModalProps) => {
  const dispatch = useDispatch()

  const leaveAccount = () => {
    dispatch(authActions.signoutStart())
  }

  return (
    <AlertDialog
      title="정말로 탈퇴하시겠습니까?"
      onClickCancelButton={onClose}
      onClickConfirmButton={leaveAccount}
    />
  )
}

export default ReconfirmSignout
