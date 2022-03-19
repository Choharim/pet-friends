import { AsyncState } from 'store/utils/async'

type SystemAsync = 'loginGuard'

export type SystemState = {
  async: { [key in SystemAsync]: AsyncState }
}
