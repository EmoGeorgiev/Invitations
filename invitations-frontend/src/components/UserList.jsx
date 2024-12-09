import { useState, useEffect } from 'react'
import userService from '../services/users'

const UserList = () => {
    const [users, setUsers] = useState([])
    const [sortOption, setSortOption] = useState('')

    useEffect(() => {
        getUsers()
    }, [])
    
    const getUsers = async () => {
        try {
            const newUsers = await userService.getUsers()
            setUsers(newUsers)
        } catch (error) {
            console.log(error)
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
            <h1 className="m-10 text-center text-4xl text-blue-800">Users</h1>
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
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default UserList