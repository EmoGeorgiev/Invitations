import { useAuth } from "./AuthContext"
import { UserRole } from '../util/Role'
import { Link } from "react-router-dom"

const Navigation = () => {
    const { user, logout, isAuthenticated } = useAuth()

    return (
        <>
            {isAuthenticated &&
                <nav className="bg-blue-500 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-5">
                            <Link className="text-white hover:text-cyan-200 transition duration-300" to="/">Home</Link>
                            {user.role === UserRole.STUDENT && <Link className="text-white hover:text-cyan-200 transition duration-300" to="/invitations/create">Create Invitation</Link>}
                            <Link className="text-white hover:text-cyan-200 transition duration-300" to="/invitations">Invitations</Link>
                            {user.role !== UserRole.ADMIN && <Link className="text-white hover:text-cyan-200 transition duration-300" to="/users">Users</Link>}
                            {user.role === UserRole.ADMIN && <Link className="text-white hover:text-cyan-200 transition duration-300" to="/admin/users">Users</Link>}
                            {user.role !== UserRole.STUDENT && <Link className="text-white hover:text-cyan-200 transition duration-300" to="/grades">Grades</Link>}
                            {user.role === UserRole.ADMIN && <Link className="text-white hover:text-cyan-200 transition duration-300" to="/admin/requests">Requests</Link>}
                            {user.role === UserRole.TEACHER && <Link className="text-white hover:text-cyan-200 transition duration-300" to="/teachers/requests">Requests</Link>}
                        </div>
                        <div className="flex space-x-5">
                            <div className="text-white">{user.username}</div>
                            <button className="text-white hover:text-cyan-200 transition duration-300" onClick={logout}>Log out</button>    
                        </div>
                    </div>
                </nav>}
        </>    
    )
}

export default Navigation