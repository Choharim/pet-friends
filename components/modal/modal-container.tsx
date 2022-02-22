import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectModals } from 'store/ui/ui.selector'
import { uiActions } from 'store/ui/ui.slice'
import { ModalName } from 'store/ui/ui.type'

import SignUpSuccess from './signup-success'
import ReconfirmAccountWithdrawal from './reconfirm-account-with-drawal'

export type ModalProps = {
  onClick: () => void
}

const MODALS: { [key in ModalName]: ({ onClick }: ModalProps) => JSX.Element } =
  {
    SignUpSuccess,
    ReconfirmAccountWithdrawal,
  }

const ModalContainer = () => {
  const dispatch = useDispatch()
  const modals = useSelector(selectModals)

  return (
    <>
      {!!modals.length &&
        modals.map((modal) => {
          const OpenedModals = MODALS[modal]

          return (
            <OpenedModals
              key={`modal-${modal}`}
              onClick={() =>
                dispatch(uiActions.showModal({ modalName: modal }))
              }
            />
          )
        })}
    </>
  )
}

export default ModalContainer
