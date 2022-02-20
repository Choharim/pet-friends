import React from 'react'
import Input from 'components/input/input'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsDuplicateNickName,
  selectNickName,
} from 'store/auth/auth.selector'
import { authActions } from 'store/auth/auth.slice'
import { WarningText } from 'constants/auth'

const MINIMUM_LENGTH = 2
const MAXIMUM_LENGTH = 15

const NickName = () => {
  const dispatch = useDispatch()
  const nickName = useSelector(selectNickName)
  const isDuplicateNickName = useSelector(selectIsDuplicateNickName)

  const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    dispatch(authActions.setNickName(value))
  }

  const showErrorText = () => {
    if (!nickName) {
      return WarningText.required
    } else if (nickName.length < MINIMUM_LENGTH) {
      return `${MINIMUM_LENGTH}자 이상 입력해주세요.`
    } else if (nickName.length > MAXIMUM_LENGTH) {
      return `${MAXIMUM_LENGTH}자 이하로 입력해주세요.`
    } else if (isDuplicateNickName) {
      return '이미 존재하는 닉네임입니다.'
    }
  }

  return (
    <Input
      label="닉네임"
      labelDesc="다른 유저와 겹치지 않는 별명을 입력해주세요. (2~15자)"
      type="text"
      onChange={changeNickName}
      value={nickName}
      errorText={showErrorText() || ''}
    />
  )
}

export default React.memo(NickName)
