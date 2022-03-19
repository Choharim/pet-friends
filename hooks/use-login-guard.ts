import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { systemActions } from 'store/system/system.slice'

const useLoginGuard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(systemActions.loginGuardStart())
  }, [dispatch])
}

export default useLoginGuard
