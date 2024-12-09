import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import teacherService from '../services/teachers'

const GradeList = () => {
    const [grades, setGrades] = useState([])
    const [sortOption, setSortOption] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getGrades()
    }, [])

    const getGrades = async () => {
        const newGrades = await teacherService.getGrades()
        setGrades(newGrades)
    }

    const viewInvitation = (id) => {
        navigate(`/invitations/${id}`)
    }

    const handleSortChange = (event) => {
        const option = event.target.value
        if (option === 'default') {
            return
        }
        setSortOption(option)

        const sortedGrades = [...grades].sort((a, b) => {
            if (option === 'grade') {
                return b.grade.localeCompare(a.grade)
            } else {
                return a.studentDto[option].localeCompare(b.studentDto[option])
            }
        })
        setGrades(sortedGrades)
    }

    return (
        <div>
            <h1 className="m-10 text-center text-4xl text-blue-800">Grades</h1>
            <div className="flex justify-end">
                <div className="mx-16 p-4 text-xl text-blue-800">
                    Sort by :
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="default"></option>
                        <option value="firstName">First name</option>
                        <option value="lastName">Last name</option>
                        <option value="facultyNumber">Faculty number</option>
                        <option value="grade">Grade</option>
                    </select>
                </div>
            </div>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">First Name</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Last Name</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Faculty Number</th>
                        <th className="px-4 py-2 text-center text-xl  text-blue-800">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map(grade => 
                        <tr className="border-t border-gray-200" key={grade.studentDto.id}>
                            <td className="px-4 py-2 text-center text-gray-700">{grade.studentDto.firstName}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{grade.studentDto.lastName}</td>
                            <td className="px-4 py-2 text-center text-gray-700">{grade.studentDto.facultyNumber}</td>
                            <td className={`px-4 py-2 text-center ${grade.grade === 'Submitted' ? "text-green-600" : "text-red-500"}`}>{grade.grade}</td>
                            <td className="px-4 py-2 text-center text-gray-700">
                                {grade.studentDto.invitationDto && 
                                    <button className="mx-2 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg" onClick={() => viewInvitation(grade.studentDto.invitationDto.id)}>
                                        View Invitation
                                    </button>}
                                
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default GradeList