import { AxiosError } from 'axios'

export type AsyncState = {
  data: true | null
  loading: boolean
  error: AxiosError | null
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
  error: (error: AxiosError): AsyncState => ({
    loading: false,
    data: null,
    error,
  }),
}
