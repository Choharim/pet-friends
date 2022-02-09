import Input from 'components/input/input'
import Layout from 'components/layout/Layout'
import Password from './_containers/password'

const Login = () => {
  return (
    <Layout title="로그인">
      <div style={{ margin: '100px' }}>
        <Input
          type="text"
          placeholder="이메일을 적어주세요"
          label="이메일"
          autoFocus
          errorText="이메일 형식이 올바르지 않습니다."
        />
        <Password />
      </div>
    </Layout>
  )
}

export default Login
