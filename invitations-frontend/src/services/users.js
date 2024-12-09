import axiosInstance  from './axiosInstance'

const baseUrl = '/api/users'

const getUsers = async () => {
    const response = await axiosInstance.get(baseUrl)
    return response.data
}

export default { getUsers }