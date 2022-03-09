import styled from '@emotion/styled'
import Button from 'components/button/button'
import React from 'react'
import Modal from './modal'

type AlertDialogProps = {
  onClickCancelButton: () => void
  onClickConfirmButton: () => void
  title: string
  error?: string
}
const AlertDialog = ({
  onClickCancelButton,
  onClickConfirmButton,
  title,
  error,
}: AlertDialogProps) => {
  return (
    <Modal>
      <ModalBox>
        <TextContainer>
          <Title>{title}</Title>
          {!!error && <ErrorText>{error}</ErrorText>}
        </TextContainer>
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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 135px;
  width: calc(100% - 40px);
  padding: 0px 20px;
`

const Title = styled.span`
  color: ${({ theme }) => theme.colors.BLACK_3};
  ${({ theme }) => theme.fonts.SUB_TITLE_2};
`

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.WARNING};
  ${({ theme }) => theme.fonts.BODY_3};
  margin-top: 5px;
  white-space: pre-wrap;
  text-align: center;
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
