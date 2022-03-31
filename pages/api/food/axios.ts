import axiosInstance from '../base'

const FoodAPI = {
  getLike: (params: { field: string; keyword: string; limit?: number }) => {
    const { field, keyword, limit = 10 } = params

    return axiosInstance.get(`/foods?${field}_like=${keyword}&_limit=${limit}`)
  },
}

export default FoodAPI
