import { useEffect, useState } from "react"
import { NotificationContext } from "./NotificationContext"
import { NotificationType } from '../util/NotificationType'
import { useLocation } from "react-router-dom"


const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null)
    const location = useLocation()

    useEffect(() => {
        clearNotification()
    }, [location])

    const triggerNotification = (message, type = NotificationType.INFO) => {
        setNotification({ message, type })
        setTimeout(() => {
            clearNotification()
        }, 2500)
    }

    const clearNotification = () => {
        setNotification(null)
    }

    return (
        <NotificationContext.Provider value={{ notification, triggerNotification, clearNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider