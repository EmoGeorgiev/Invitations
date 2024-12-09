import { useAuth } from './AuthContext'

const Home = () => {
    const { user } = useAuth()
    return (
        <div>
            <h1 className="m-20 text-blue-800 text-4xl text-center">Web technologies presentations - invitations</h1>
            <h3 className="text-blue-800 text-3xl text-center">Welcome, <span className="underline">{user.username}</span>, to the website dedicated to creating and viewing invitaions</h3>
        </div>
    )
}

export default Home