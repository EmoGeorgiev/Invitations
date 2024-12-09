import { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useParams } from 'react-router-dom'
import { NotificationType } from '../util/NotificationType'
import { useNotification } from './NotificationContext'
import invitationService from '../services/invitations'

const defaultErrors = {
    'topicId': '',
    'title': '',
    'studentName': '',
    'facultyNumber': '',
    'date': '',
    'time': '',
    'auditory': ''
}

const Invitation = () => {
    const [invitation, setInvitation] = useState(null)
    const [isEdited, setIsEdited] = useState(false)
    const { user } = useAuth()
    const { trigerNotification } = useNotification()
    const { id } = useParams()

    const [topicId, setTopicId] = useState('')
    const [title, setTitle] = useState('')
    const [studentName, setStudentName] = useState('')
    const [facultyNumber, setFacultyNumber] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [auditory, setAuditory] = useState('')
    const [errors, setErrors] = useState(defaultErrors)
    
    useEffect(() => {
        getInvitation(id)
    }, [id])


    const getInvitation = async (id) => {
        try {
            const newInvitation = await invitationService.getInvitation(id)
            setInvitation(newInvitation)
        } catch (error) {
            setInvitation(null)
        }
    }

    const updateInvitation = async () => {
        try {
            const newInvitation = {
                'id': invitation.id,
                'topicId': topicId,
                'title': title,
                'studentName': studentName,
                'facultyNumber': facultyNumber,
                'date': date,
                'time': time,
                'auditory': auditory,
                'studentId': invitation.studentId
            }

            const updatedInvitation = await invitationService.updateInvitation(id, newInvitation)
            setInvitation(updatedInvitation)
            setIsEdited(false)
            
        } catch (error) {
            if (error.status === 400) {
                setErrors({...errors, ...error.response.data})
                setTimeout(() => {
                    setErrors(defaultErrors)
                }, 5000)
            }
        }
    }

    const deleteInvitation = async () => {
        try {
            if (window.confirm('Are you sure you want to delete your invitation?')) {
                await invitationService.deleteInvitation(invitation.id)
                setInvitation(null)
            }
        } catch (error) {
            trigerNotification('Could not delete the invitation', NotificationType.ERROR)
        }
    }

    const handleEdit = () => {
        setIsEdited(true)
        
        setErrors(defaultErrors)
        
        setTopicId(invitation.topicId)
        setTitle(invitation.title)
        setStudentName(invitation.studentName)
        setFacultyNumber(invitation.facultyNumber)
        setDate(invitation.date)
        setTime(invitation.time)
        setAuditory(invitation.auditory)
    }

    return (
        <div>
            <h1 className="mt-10 text-4xl text-center text-blue-800">Invitation</h1>
            {invitation ? (isEdited
            ? <div className="mt-6 flex justify-center items-start">
                <div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-center text-lg text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg" 
                            type="text"
                            value={topicId}
                            onChange={({ target }) => setTopicId(target.value)}
                            placeholder="Topic id"
                        />
                        <div className="text-center font-medium text-red-500">{errors.topicId}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-center text-lg text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            placeholder="Title"
                        />
                        <div className="text-center font-medium text-red-500">{errors.title}</div>  
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-center text-lg text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={studentName}
                            onChange={({ target }) => setStudentName(target.value)}
                            placeholder="Student name"
                        />
                        <div className="text-center font-medium text-red-500">{errors.studentName}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-center text-lg text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={facultyNumber}
                            onChange={({ target }) => setFacultyNumber(target.value)}
                            placeholder="Faculty number"
                        />
                        <div className="text-center font-medium text-red-500">{errors.facultyNumber}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-center text-lg text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="date"
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                            placeholder="date"
                        />
                        <div className="text-center font-medium text-red-500">{errors.date}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-center text-lg text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="time"
                            value={time}
                            onChange={({ target }) => setTime(target.value)}
                            placeholder="time"
                        />
                        <div className="text-center font-medium text-red-500">{errors.time}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-center text-lg text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={auditory}
                            onChange={({ target }) => setAuditory(target.value)}
                            placeholder="auditory"
                        />
                        <div className="text-center font-medium text-red-500">{errors.auditory}</div>
                    </div>
                    <div>
                        <button className="w-44 m-4 p-2 bg-green-500 hover:bg-green-700 text-white rounded-lg" onClick={updateInvitation}>Save</button>
                        <button className="w-44 m-4 p-2 bg-red-700 hover:bg-red-900 text-white rounded-lg" onClick={() => setIsEdited(false)}>Cancel</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            : <div className="flex justify-center items-center">
                <div className="mt-6">
                    <div className="w-96 mx-auto block mt-2 p-2 bg-white text-blue-700 text-lg text-center border border-gray-400 rounded-lg">Topic id : {invitation.topicId}</div>
                    <div className="w-96 mx-auto block mt-2 p-2 bg-white text-blue-700 text-lg text-center border border-gray-400 rounded-lg">Title : {invitation.title}</div>
                    <div className="w-96 mx-auto block mt-2 p-2 bg-white text-blue-700 text-lg text-center border border-gray-400 rounded-lg">Student name : {invitation.studentName}</div>
                    <div className="w-96 mx-auto block mt-2 p-2 bg-white text-blue-700 text-lg text-center border border-gray-400 rounded-lg">Faculty Number : {invitation.facultyNumber}</div>
                    <div className="w-96 mx-auto block mt-2 p-2 bg-white text-blue-700 text-lg text-center border border-gray-400 rounded-lg">Date : {invitation.date}</div>
                    <div className="w-96 mx-auto block mt-2 p-2 bg-white text-blue-700 text-lg text-center border border-gray-400 rounded-lg">Time : {invitation.time}</div>
                    <div className="w-96 mx-auto block mt-2 p-2 bg-white text-blue-700 text-lg text-center border border-gray-400 rounded-lg">Auditory : {invitation.auditory}</div>
                    
                    {invitation.studentId === user.id &&
                        <div>
                            <button className="w-44 m-4 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg" onClick={handleEdit}>Edit</button>
                            <button className="w-44 m-4 p-2 bg-red-700 hover:bg-red-900 text-white rounded-lg" onClick={deleteInvitation}>Delete</button>
                        </div>}
                </div>
            </div>) 
            : <p className="mt-10 text-4xl text-center text-red-500">There does not exist such an invitation</p>}
        </div>
    )
}

export default Invitation