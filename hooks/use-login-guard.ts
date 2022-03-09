import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'

const useLoginGuard = () => {
  const dispatch = useDispatch()

  //TODO: 로그인 가드 만들기
  useEffect(() => {
    dispatch(authActions.loginGuardStart())
  }, [])
}

export default useLoginGuard
