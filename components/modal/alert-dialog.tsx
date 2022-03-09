import styled from '@emotion/styled'
import Button from 'components/button/button'
import React from 'react'
import Modal from './modal'

type AlertDialogProps = {
  onClickCancelButton: () => void
  onClickConfirmButton: () => void
  title: string
}
const AlertDialog = ({
  onClickCancelButton,
  onClickConfirmButton,
  title,
}: AlertDialogProps) => {
  return (
    <Modal>
      <ModalBox>
        <Title>{title}</Title>
        <ButtonContainer>
          <CancelButton onClick={onClickCancelButton} themeColor="GREY_1">
            취소
          </CancelButton>
          <ConfirmButton onClick={onClickConfirmButton} themeColor="MAIN_5">
            확인
          </ConfirmButton>
        </ButtonContainer>
      </ModalBox>
    </Modal>
  )
}

export default AlertDialog

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 135px;
  width: calc(100% - 40px);
  padding: 0px 20px;
  color: ${({ theme }) => theme.colors.BLACK_3};
  ${({ theme }) => theme.fonts.SUB_TITLE_2};
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.fonts.SUB_TITLE_3};
`

const CancelButton = styled(Button)`
  height: 45px;
  border-radius: 0 0 0 4px;
`

const ConfirmButton = styled(Button)`
  height: 45px;
  border-radius: 0 0 4px 0;
`
