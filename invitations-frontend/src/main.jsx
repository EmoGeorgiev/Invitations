import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './components/AuthProvider.jsx'
import NotificationProvider from './components/NotificationProvider.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <NotificationProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </NotificationProvider>
    </Router>
)