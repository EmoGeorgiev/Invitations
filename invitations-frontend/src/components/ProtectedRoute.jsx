import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated, isLoading } = useAuth()
    
    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoute