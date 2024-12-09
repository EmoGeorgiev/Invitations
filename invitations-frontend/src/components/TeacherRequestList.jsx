import { useEffect, useState } from 'react'
import { useNotification } from './NotificationContext'
import { NotificationType } from '../util/NotificationType'
import teacherService from '../services/teachers'


const TeacherRequestList = () => {
    const [students, setStudents] = useState([])
    const [sortOption, setSortOption] = useState('')
    const { triggerNotification } = useNotification()

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const newStudents = await teacherService.getNotActivatedStudents()
            setStudents(newStudents)
        } catch (error) {
            console.log(error)
        }
    }

    const handleApprove = async (id) => {
        if (window.confirm('Are you sure you want to approve this student')) {
            try {
                const updatedStudent = await teacherService.enableStudent(id)
                setStudents(students.filter(student => student.id !== updatedStudent.id))
                triggerNotification(`You have successfully approved the user ${updatedStudent.firstName} ${updatedStudent.lastName}`)
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

        const sortedStudents = [...students].sort((a, b) => {
            return a[option].localeCompare(b[option])
        })
        setStudents(sortedStudents)
    }

    return (
        <div>
            <h1 className="m-10 text-center text-4xl text-blue-800">Student requests</h1>
            {students.length === 0
            ? <p className="mt-16 text-3xl text-center text-green-600">There are currently no students waiting for approval</p> 
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
                        {students.map(student => 
                                <tr className="border-t border-gray-200" key={student.id}>
                                    <td className="px-4 py-2 text-center text-gray-700">{student.firstName}</td>
                                    <td className="px-4 py-2 text-center text-gray-700">{student.lastName}</td>
                                    <td className="px-4 py-2 text-center text-gray-700">{student.email}</td>
                                    <td className="px-4 py-2 text-center text-gray-700">{student.role}</td>
                                    <td className="px-4 py-2 text-center text-gray-700">
                                        <button className="mx-2 p-2 bg-green-500 hover:bg-green-700 text-white rounded-lg" onClick={() => handleApprove(student.id)}>Approve</button>
                                    </td>
                                </tr>)}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default TeacherRequestList