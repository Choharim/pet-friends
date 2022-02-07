import styled from '@emotion/styled'
import React from 'react'
import Modal from './modal'

const FistModal = () => {
  return (
    <Modal>
      <ModalBox>
        <SuccessImg src="" />
        <Title>펫프렌즈 회원가입 성공!</Title>
        <Desc>
          {
            '펫프렌즈에 오신걸 환영합니다!\n행복하고 건강한 댕댕이를 위해 함께해요'
          }
        </Desc>
      </ModalBox>
    </Modal>
  )
}

export default FistModal

const ModalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  padding: 35px 25px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.MAIN_1};
  overflow-y: auto;
`

const SuccessImg = styled.img`
  width: 160px;
`

const Title = styled.span`
  margin: 30px 0 10px;
  ${({ theme }) => theme.fonts.SUB_TITLE_1};
  color: ${({ theme }) => theme.colors.BLACK_3};
`

const Desc = styled.span`
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.fonts.SUB_TITLE_3};
  color: ${({ theme }) => theme.colors.WHITE};
`
