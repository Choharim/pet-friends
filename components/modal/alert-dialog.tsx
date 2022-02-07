import { css } from '@emotion/react'
import styled from '@emotion/styled'
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
          <CancelButton onClick={onClickCancelButton}>취소</CancelButton>
          <ConfirmButton onClick={onClickConfirmButton}>확인</ConfirmButton>
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
  ${({ theme }) => theme.fonts.SUB_TITLE_1};
`

const ButtonBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  cursor: pointer;
`
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  ${({ theme }) => theme.fonts.SUB_TITLE_3};
  color: ${({ theme }) => theme.colors.BLACK_3};
`

const CancelButton = styled.div`
  ${ButtonBase};
  border-radius: 0 0 0 4px;
  background-color: ${({ theme }) => theme.colors.GREY_1};
  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_2};
  }
`

const ConfirmButton = styled.div`
  ${ButtonBase};
  border-radius: 0 0 4px 0;
  background-color: ${({ theme }) => theme.colors.MAIN_1};
  &:hover {
    background-color: ${({ theme }) => theme.colors.MAIN_2};
  }
`
