import { useEffect } from 'react'

export const useBlockScroll = (): void => {
  useEffect(() => {
    document.body.style.paddingRight = '0px'
    document.body.style.overflow = 'hidden'
    document.body.style.transition = 'padding-right 0.2s ease'

    return () => {
      document.body.style.paddingRight = 'unset'
      document.body.style.overflow = 'unset'
    }
  }, [])
}
