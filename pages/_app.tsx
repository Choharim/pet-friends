import { ThemeProvider, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { reduxWrapper } from 'store'
import { reset, theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default reduxWrapper.withRedux(MyApp)
