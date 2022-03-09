import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectModals } from 'store/ui/ui.selector'
import { uiActions } from 'store/ui/ui.slice'
import { ModalName } from 'store/ui/ui.type'

import SignUpSuccess from './signup-success'
import ReconfirmSignout from './reconfirm-signout'

export type ModalProps = {
  onClose: () => void
}

const MODALS: { [key in ModalName]: ({ onClose }: ModalProps) => JSX.Element } =
  {
    SignUpSuccess,
    ReconfirmSignout,
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
              onClose={() => dispatch(uiActions.closeModal(modal))}
            />
          )
        })}
    </>
  )
}

export default ModalContainer
