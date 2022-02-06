import styled from '@emotion/styled'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <Text>hi</Text>
    </div>
  )
}

export default Home

const Text = styled.span`
  color: ${({ theme }) => theme.colors.MAIN_1};
`
