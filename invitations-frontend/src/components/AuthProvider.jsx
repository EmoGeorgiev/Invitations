import { useEffect } from 'react'
import { useState } from 'react'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const login = (data) => {
        const localStorageUser = {
            'username': data.username,
            'role': data.role,
            'id': data.id
        }
        window.localStorage.setItem(
            'loggedInvitationsUser', JSON.stringify(localStorageUser)
        )
        window.localStorage.setItem('token', data.token)

        setUser(localStorageUser)
        setIsAuthenticated(true)
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)

        localStorage.removeItem('loggedInvitationsUser')
        localStorage.removeItem('token')
    }

    const loadUser = () => {
        const localStorageUser = JSON.parse(localStorage.getItem('loggedInvitationsUser'))
        
        if (localStorageUser) {
            setUser(localStorageUser)
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, user, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider