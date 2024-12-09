import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from './AuthContext'
import { useNotification } from './NotificationContext'
import { NotificationType } from '../util/NotificationType'
import loginService from '../services/login'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()
    const { triggerNotification } = useNotification()

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const data = await loginService.login({
                username,
                password
            })
            login(data)
            setUsername('')
            setPassword('')
            navigate('/')            
        } catch (error) {
            triggerNotification('Wrong username or password', NotificationType.ERROR)
        }
    }

    return (
        <div className="mt-16 flex justify-center items-start h-screen">
            <div className="w-full max-w-md">
                <h1 className="text-4xl text-center text-blue-600">Login form</h1>
                <form onSubmit={handleLogin}>
                    <div className="mt-6">
                        <input
                            className="w-96 mx-auto block mt-2 p-2 text-gray-700 focus:border-blue-500 focus:outline-none border border-blue-100 rounded-lg"
                            type="text"
                            value={username}
                            name="username"
                            onChange={({ target }) => setUsername(target.value)}
                            placeholder="Username"
                        />
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
                    </div>
                    <button className="w-96 mx-auto block mt-3 p-2 hover:bg-blue-700 bg-blue-500 text-xl text-white rounded-lg">Log in</button>
                </form>
                <p className="mt-3 text-xl text-center text-blue-800">If you have not already signed up, <Link className="underline hover:bg-blue-200 hover:rounded transition duration-300" to="/signup">click here </Link></p>
            </div>
        </div>
    )
}

export default LoginForm