import axiosInstance  from './axiosInstance'

const baseUrl = '/api/admin'

const getUsers = async () => {
    const response = await axiosInstance.get(`${baseUrl}/users`)
    return response.data
}

const getNotActivatedUsers = async () => {
    const response = await axiosInstance.get(`${baseUrl}/users/not-activated`)
    return response.data
}

const enableUser = async (id) => {
    const response = await axiosInstance.put(`${baseUrl}/users/enable/${id}`)
    return response.data
}

const disableUser = async (id) => {
    const response = await axiosInstance.put(`${baseUrl}/users/disable/${id}`)
    return response.data
}

const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`${baseUrl}/users/${id}`)
    return response.data
}

export default { getUsers, getNotActivatedUsers, enableUser, disableUser, deleteUser }