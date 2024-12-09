import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useNotification } from './NotificationContext'
import { NotificationType } from '../util/NotificationType'
import { defaultSignUpErrors } from '../util/Errors'
import signupService from "../services/signup"



const SignUpForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('STUDENT')
    const [facultyNumber, setFacultyNumber] = useState('')
    const [department, setDepartment] = useState('')
    const [errors, setErrors] = useState(defaultSignUpErrors)
    const { triggerNotification } = useNotification()
    
    const handleSignUp = async (event) => {
        event.preventDefault()
        
        const credentials = {
            username,
            password,
            firstName,
            lastName,
            email,
            role
        }
        
        let user = null;
        try {
            if (role === 'STUDENT') {
                user = await signupService.signup({ ...credentials, facultyNumber })
            } else {
                user = await signupService.signup({ ...credentials, department })
            }

            if (user !== null) {
                navigate('/login')
            }
        } catch (error) {
            if (error.status === 400) {
                setErrors({...errors, ...error.response.data})
            } else if (error.status === 409) {
                setErrors({...errors, ...error.response.data, 'username': 'Username already exists'})
            } else {
                triggerNotification('Could not sign up', NotificationType.ERROR)
            }
            setTimeout(() => {
                setErrors(defaultSignUpErrors)
            }, 5000)
        }
    }

    return (
        <div className="mt-16 flex justify-center items-start h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-4xl text-center text-blue-600">Create Account</h1>
                <form onSubmit={handleSignUp}>
                    <div className="mt-6">
                        <select className="w-96 mx-auto block p-2 text-gray- focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg" value={role} onChange={({ target }) => setRole(target.value)}>
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                        </select>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text" 
                            value={username}
                            name="username"
                            onChange={({ target }) => setUsername(target.value)}
                            placeholder="Username"
                        />
                        <div className="text-center font-medium text-red-500">{errors.username}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="password" 
                            value={password}
                            name="password"
                            onChange={({ target }) => setPassword(target.value)}
                            placeholder="Password"
                        />
                        <div className="text-center font-medium text-red-500">{errors.password}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text" 
                            value={firstName}
                            name="firstName"
                            onChange={({ target }) => setFirstName(target.value)}
                            placeholder="First name"
                        />
                        <div className="text-center font-medium text-red-500">{errors.firstName}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text" 
                            value={lastName}
                            name="lastName"
                            onChange={({ target }) => setLastName(target.value)}
                            placeholder="Last name"
                        />
                        <div className="text-center font-medium text-red-500">{errors.lastName}</div>
                    </div>
                    <div>
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="email" 
                            value={email}
                            name="email"
                            onChange={({ target }) => setEmail(target.value)}
                            placeholder="Email"
                        />
                        <div className="text-center font-medium text-red-500">{errors.email}</div>
                    </div>

                    {
                        role === 'STUDENT'
                        ?
                        <div>
                            <input
                                className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                                type="text"
                                value={facultyNumber}
                                name="facultyNumber"
                                onChange={({ target }) => setFacultyNumber(target.value)}
                                placeholder="Faculty number"
                            />
                            <div className="text-center font-medium text-red-500">{errors.facultyNumber}</div>
                        </div>
                        :
                        <div>
                            <input
                                className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                                type="text" 
                                value={department}
                                name="department"
                                onChange={({ target }) => setDepartment(target.value)}
                                placeholder="Department"
                            />
                            <div className="text-center font-medium text-red-500">{errors.department}</div>
                        </div>
                    }

                    <button className="w-96 mx-auto block mt-3 p-2 hover:bg-blue-700 bg-blue-500 text-xl text-white rounded-lg">Create account</button>
                </form>
                <p className="mt-3 text-xl text-center text-blue-800">If you already have an account, <Link className="underline hover:bg-blue-200 hover:rounded transition duration-300" to="/login">click here</Link></p>
            </div>
        </div>
    )
}

export default SignUpForm