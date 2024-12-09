import axios from "axios"

const baseUrl = 'http://localhost:8080/api/signup'

const signup = async credentials => {
    let endOfUrl = null
    if (credentials.role === 'STUDENT') {
        endOfUrl = '/student'
    } else {
        endOfUrl = '/teacher'
    }
    const url = baseUrl + endOfUrl
    const response = await axios.post(url, credentials)

    return response.data
}

export default { signup }