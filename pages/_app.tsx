import { ThemeProvider, Global } from '@emotion/react'
import 'firebase-config'
import type { AppProps } from 'next/app'
import { reduxWrapper } from 'store'
import { reset, theme } from '../theme'
import ToastContainer from 'components/toast/toast-container'
import ModalContainer from 'components/modal/modal-container'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <Component {...pageProps} />
      <ToastContainer />
      <ModalContainer />
    </ThemeProvider>
  )
}

export default reduxWrapper.withRedux(MyApp)
