import React from 'react'
import { useDispatch } from 'react-redux'
import AlertDialog from './alert-dialog'
import { ModalProps } from './modal-container'

const ReconfirmAccountWithdrawal = ({ onClick }: ModalProps) => {
  const dispatch = useDispatch()

  const leaveAccount = () => {
    //dispatch(deleteUserAccountStart());
  }

  return (
    <AlertDialog
      title="정말로 탈퇴하시겠습니까?"
      onClickCancelButton={onClick}
      onClickConfirmButton={leaveAccount}
    />
  )
}

export default ReconfirmAccountWithdrawal
