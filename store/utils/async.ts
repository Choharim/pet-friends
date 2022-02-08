export type AsyncState = {
  data: true | null
  loading: boolean
  error: string | null
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
  error: (error: string): AsyncState => ({
    loading: false,
    data: null,
    error,
  }),
}
