import { User } from 'store/auth/auth.type'
import axiosInstance from '../base'

const AuthAPI = {
  postUser: (user: User) => {
    return axiosInstance.post('/users', user)
  },
  getUserByField: (field: keyof User, value: string) => {
    return axiosInstance.get(`/users?${field}=${value}`)
  },
  deleteUser: (id: string) => {
    return axiosInstance.delete(`/users/${id}`)
  },
}

export default AuthAPI
