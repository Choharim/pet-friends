import React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { ICON_CDN_URL } from 'constants/common'

const GoBack = () => {
  const router = useRouter()

  const goToBack = () => {
    router.back()
  }

  return (
    <GoBackIcon
      onClick={goToBack}
      src={`${ICON_CDN_URL}/512/2223/2223627.png`}
      alt="go-back_icon"
    />
  )
}

export default React.memo(GoBack)

const GoBackIcon = styled.img`
  width: 32px;
  margin-right: 10px;
  transform: rotate(180deg);
  cursor: pointer;
`
