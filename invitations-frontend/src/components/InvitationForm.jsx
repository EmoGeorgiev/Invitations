import { useState } from "react"
import { useAuth } from './AuthContext'
import { useNotification } from './NotificationContext'
import { NotificationType } from '../util/NotificationType'
import { defaultInvitationErrors } from '../util/Errors'
import invitationService from '../services/invitations'

const InvitationForm = () => {
    const [topicId, setTopicId] = useState('')
    const [title, setTitle] = useState('')
    const [studentName, setStudentName] = useState('')
    const [facultyNumber, setFacultyNumber] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [auditory, setAuditory] = useState('')
    const [errors, setErrors] = useState(defaultInvitationErrors)
    const { user } = useAuth()
    const { triggerNotification } = useNotification()
    
    const resetFields = () => {
        setTopicId('')
        setTitle('')
        setStudentName('')
        setFacultyNumber('')
        setDate('')
        setTime('')
        setAuditory('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const invitation = {
            topicId,
            title,
            studentName,
            facultyNumber,
            date,
            time,
            auditory,
            'studentId': user.id
        }
        
        try {
            await invitationService.addInvitation(invitation)
            triggerNotification('You have successfully added your invitation')
            resetFields()
        } catch (error) {
            if (error.status === 400) {
                setErrors({...defaultInvitationErrors, ...error.response.data})
                setTimeout(() => {
                    setErrors(defaultInvitationErrors)
                }, 5000)
            } else if (error.status === 409) {
                resetFields()
                triggerNotification(error.response.data.message, NotificationType.ERROR)
            }
        }
    }

    return (
        <div className="mt-16 flex justify-center items-start">
            <div className="m-auto">
                <h1 className="text-4xl text-center text-blue-800">Create invitation</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-6">
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="number"
                            value={topicId}
                            onChange={({ target }) => setTopicId(target.value)}
                            placeholder="Topic id"
                        />
                        <div className="text-center font-medium text-red-500">{errors.topicId}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            placeholder="Title"
                        />
                        <div className="text-center font-medium text-red-500">{errors.title}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={studentName}
                            onChange={({ target }) => setStudentName(target.value)}
                            placeholder="Student name"
                        />
                        <div className="text-center font-medium text-red-500">{errors.studentName}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={facultyNumber}
                            onChange={({ target }) => setFacultyNumber(target.value)}
                            placeholder="Faculty number"
                        />
                        <div className="text-center font-medium text-red-500">{errors.facultyNumber}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="date"
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                            placeholder="Date"
                        />
                        <div className="text-center font-medium text-red-500">{errors.date}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="time"
                            value={time}
                            onChange={({ target }) => setTime(target.value)}
                            placeholder="Time"
                        />
                        <div className="text-center font-medium text-red-500">{errors.time}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={auditory}
                            onChange={({ target }) => setAuditory(target.value)}
                            placeholder="Auditory"
                        />
                        <div className="text-center font-medium text-red-500">{errors.auditory}</div>
                    </div>
                    <button className="w-96 mx-auto block mt-3 p-2 hover:bg-blue-700 bg-blue-500 text-xl text-white rounded-lg">Create invitaiton</button>
                </form>
            </div>
        </div>
    )

}

export default InvitationForm