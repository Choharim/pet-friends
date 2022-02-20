import { ThemeProvider, Global } from '@emotion/react'
import 'firebase-config'
import type { AppProps } from 'next/app'
import { reduxWrapper } from 'store'
import { reset, theme } from '../theme'
import ToastContainer from 'components/toast/toast-container'
import ModalContainer from 'components/modal/modal-container'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from 'store/auth/auth.slice'

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActions.persistUserStart())
  }, [dispatch])

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
