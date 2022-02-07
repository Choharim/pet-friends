import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectModals } from 'store/ui/ui.selector'
import { toggleModal } from 'store/ui/ui.slice'
import { ModalName } from 'store/ui/ui.types'

import SignUpSuccess from './signup-success'
import ReconfirmAccountWithdrawal from './reconfirm-account-with-drawal'

export type ModalProps = {
  onClick: () => void
}

const RenderInModalContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const modalContainerElement = useMemo(
    () => document.getElementById('modal-container') as HTMLElement,
    []
  )

  return createPortal(children, modalContainerElement)
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
    <RenderInModalContainer>
      {!!modals.length &&
        modals.map((modal) => {
          const OpenedModals = MODALS[modal]

          return (
            <OpenedModals
              key={`modal-${modal}`}
              onClick={() => dispatch(toggleModal({ modalName: modal }))}
            />
          )
        })}
    </RenderInModalContainer>
  )
}

export default ModalContainer
