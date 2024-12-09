import axiosInstance  from './axiosInstance'

const baseUrl = '/api/teachers'

const getGrades = async () => {
    const response = await axiosInstance.get(`${baseUrl}/grades`)
    return response.data
}

const getNotActivatedStudents = async () => {
    const response = await axiosInstance.get(`${baseUrl}/students/not-activated`)
    return response.data
}

const enableStudent = async (id) => {
    const response = await axiosInstance.put(`${baseUrl}/students/enable/${id}`)
    return response.data
}

export default { getGrades, getNotActivatedStudents, enableStudent }