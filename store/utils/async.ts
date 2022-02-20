import { AxiosError } from 'axios'
import { FirebaseError } from 'firebase/app'

export type AsyncState = {
  data: true | null
  loading: boolean
  error: AxiosError | FirebaseError | null
}

export const asyncState = {
  initial: (): AsyncState => ({
    loading: false,
    data: null,
    error: null,
  }),
  load: (): AsyncState => ({
    loading: true,
    data: null,
    error: null,
  }),
  success: (): AsyncState => ({
    loading: false,
    data: true,
    error: null,
  }),
  error: (error: AxiosError | FirebaseError): AsyncState => ({
    loading: false,
    data: null,
    error,
  }),
}
