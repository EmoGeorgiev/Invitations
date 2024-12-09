import { useState, useEffect } from 'react'
import { useNotification } from './NotificationContext'
import { NotificationType } from '../util/NotificationType'
import adminService from '../services/admin'

const AdminUserList = () => {
    const [users, setUsers] = useState([])
    const [sortOption, setSortOption] = useState('')
    const { triggerNotification } = useNotification()

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const newUsers = await adminService.getUsers()
            setUsers(newUsers)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDisable = async (id) => {
        if (window.confirm('Are you sure you want to disable this user')) {
            try {
                const updatedUser = await adminService.disableUser(id)
                setUsers(users.map(user => user.id !== updatedUser.id ? user : updatedUser))
                triggerNotification(`You have successfully disabled the user ${updatedUser.firstName} ${updatedUser.lastName}`)
            } catch (error) {
                triggerNotification(error.response.data.message, NotificationType.ERROR)
            }
        }
    }

    const handleEnable = async (id) => {
        if (window.confirm('Are you sure you want to enable this user')) { 
            try {
                const updatedUser = await adminService.enableUser(id)
                setUsers(users.map(user => user.id !== updatedUser.id ? user : updatedUser))
                triggerNotification(`You have successfully enabled the user ${updatedUser.firstName} ${updatedUser.lastName}`)
             } catch (error) {
                triggerNotification(error.response.data.message, NotificationType.ERROR)
             }
        } 
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user')) {
            try {
                const deletedUser = await adminService.deleteUser(id)
                const newUsers = [...users].filter(user => user.id !== id)
                setUsers(newUsers)
                triggerNotification(`You have successfully deleted the user ${deletedUser.firstName} ${deletedUser.lastName}`)
            } catch (error) {
                triggerNotification(error.response.data.message, NotificationType.ERROR)
            }
        }
    }

    const handleSortChange = (event) => {
        const option = event.target.value
        if (option === 'default') {
            return
        }
        setSortOption(option)

        const sortedUsers = [...users].sort((a, b) => {
            return a[option].localeCompare(b[option])
        })
        setUsers(sortedUsers)
    }
    
    return (
        <>
            <h1 className="m-10 text-center text-4xl text-blue-800">Users</h1>
            <div className="flex justify-end">
                <div className="mx-24 p-4 text-xl text-blue-800">
                    Sort by :   
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="default"></option>
                        <option value="firstName">First name</option>
                        <option value="lastName">Last name</option>
                        <option value="email">Email</option>
                        <option value="role">Role</option>
                    </select>
                </div>
            </div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">First name</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Last name</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Email</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Role</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => 
                        <tr className="border-t border-gray-200" key={user.id}>
                            <td className="px-4 py-2 text-center text-gray-700">{user.firstName}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{user.lastName}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{user.email}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{user.role}</td>
                            <td className="px-4 py-2 text-center text-gray-700">
                                <button className={`mx-2 p-2 text-white rounded-lg ${user.enabled ? "bg-gray-500 hover:bg-gray-700"  : "bg-green-500 hover:bg-green-700"}`} onClick={user.enabled ? () => handleDisable(user.id) : () => handleEnable(user.id)}>
                                    {user.enabled ? 'Disable' : 'Enable'}
                                </button>
                                <button className="mx-2 p-2 bg-red-700 hover:bg-red-900 text-white rounded-lg" onClick={() => handleDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}   

export default AdminUserList