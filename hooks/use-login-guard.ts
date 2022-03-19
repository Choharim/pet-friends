import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { systemActions } from 'store/system/system.slice'

const useLoginGuard = () => {
  const dispatch = useDispatch()

  //TODO: 로그인 가드 만들기
  useEffect(() => {
    dispatch(systemActions.loginGuardStart())
  }, [dispatch])
}

export default useLoginGuard
