import { useEffect, useState } from 'react'
import { useNotification } from './NotificationContext'
import { NotificationType } from '../util/NotificationType'
import adminService from '../services/admin'


const AdminRequestList = () => {
    const [users, setUsers] = useState([])
    const [sortOption, setSortOption] = useState('')
    const { triggerNotification } = useNotification()

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const newUsers = await adminService.getNotActivatedUsers()
            setUsers(newUsers)
        } catch (error) {
            console.log(error)
        }
    }

    const handleApprove = async (id) => {
        if (window.confirm('Are you sure you want to approve this user')) {
            try {
                const updatedUser = await adminService.enableUser(id)
                setUsers(users.filter(user => user.id !== updatedUser.id))
                triggerNotification(`You have successfully approved the user ${updatedUser.firstName} ${updatedUser.lastName}`)
            } catch (error) {
                triggerNotification(error.reponse.data.message, NotificationType.ERROR)
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
        <div>
            <h1 className="m-10 text-center text-4xl text-blue-800">User requests</h1>
            {users.length === 0
            ? <p className="mt-16 text-3xl text-center text-green-600">There are currently no users waiting for approval</p>
            : <div>
                <div className="flex justify-end">
                    <div className="mx-10 p-4 text-xl text-blue-800">
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
                                        <button className="mx-2 p-2 bg-green-500 hover:bg-green-700 text-white rounded-lg" onClick={() => handleApprove(user.id)}>Approve</button>
                                    </td>
                                </tr>)}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default AdminRequestList