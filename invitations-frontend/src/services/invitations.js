import axiosInstance  from './axiosInstance'

const baseUrl = '/api/invitations'

const getInvitations = async () => {
    const response = await axiosInstance.get(baseUrl)
    return response.data
}

const getInvitation = async (id) => {
    const response = await axiosInstance.get(`${baseUrl}/${id}`)
    return response.data
}

const addInvitation = async (invitation) => {
    const response = await axiosInstance.post(baseUrl, invitation)
    return response.data
}

const updateInvitation = async (id, invitation) => {
    const response = await axiosInstance.put(`${baseUrl}/${id}`, invitation) 
    return response.data
}

const deleteInvitation = async (id) => {
    const response = await axiosInstance.delete(`${baseUrl}/${id}`)
    return response.data
}

export default { getInvitation, getInvitations, addInvitation, updateInvitation, deleteInvitation }