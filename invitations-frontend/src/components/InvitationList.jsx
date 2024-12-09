import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import invitationService from '../services/invitations'
import { UserRole } from '../util/Role'

const InvitationList = () => {
    const [invitations, setInvitations] = useState([])
    const [sortOption, setSortOption] = useState('')
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        getInvitations()
    }, [])

    const getInvitations = async () => {
        try {
            const newInvitations = await invitationService.getInvitations()
            setInvitations(newInvitations)
        } catch (error) {
            console.log(error)
        }
    }

    const handleView = (id) => {
        navigate(`/invitations/${id}`)
    }

    const handleUserInvitationView = () => {
        const userInvitation = invitations.find(invitation => invitation.studentId === user.id)
        let id = -1
        if (userInvitation) {
            id = userInvitation.id
        }
        handleView(id)
    }

    const handleSortChange = (event) => {
        const option = event.target.value
        if (option === 'default') {
            return
        }
        setSortOption(option)

        const sortedInvitations = [...invitations].sort((a, b) => {
            if (option === 'topicId') {
                return a.topicId - b.topicId
            } else {
                return a[option].localeCompare(b[option])
            }
        })
        setInvitations(sortedInvitations)
    }
    
    return (
        <div> 
            <h1 className="m-10 text-center text-4xl text-blue-800">Invitations</h1>
            {user.role === UserRole.STUDENT && 
                <div className="flex justify-center"> 
                    <button className="mx-2 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg" onClick={handleUserInvitationView}>View my invitation</button>
                </div>}
            <div className="flex justify-end">
                <div className="mx-10 p-4 text-xl text-blue-800">
                    Sort by : 
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="default"></option>
                        <option value="topicId">Topic id</option>
                        <option value="title">Title</option>
                        <option value="studentName">Student</option>
                        <option value="facultyNumber">Faculty number</option>
                        <option value="date">Date</option>
                        <option value="time">Time</option>
                        <option value="auditory">Auditory</option>
                    </select>
                </div>
            </div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Topic id</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Title</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Student</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Faculty number</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Date</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Time</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Auditory</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Invitation</th>
                    </tr>
                </thead>
                <tbody>
                    {invitations.map(invitation => 
                        <tr className="border-t border-gray-200" key={invitation.id}>
                            <td className="px-4 py-2 text-center text-gray-700">{invitation.topicId}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{invitation.title}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{invitation.studentName}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{invitation.facultyNumber}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{invitation.date}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{invitation.time}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{invitation.auditory}</td>
                            <td className="px-4 py-2 text-center text-gray-700">
                                <button className="mx-2 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg" onClick={() => handleView(invitation.id)}>View</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default InvitationList