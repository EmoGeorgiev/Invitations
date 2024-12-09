import { useNotification } from "./NotificationContext"
import { NotificationType } from '../util/NotificationType'

const Notification = () => {
    const { notification, clearNotification } = useNotification()

    if (!notification) {
        return null
    }

    return (
        <div className={`mt-16 text-xl text-center font-bold  ${notification.type === NotificationType.ERROR ? "text-red-500" : "text-green-500"}`}>
            {notification.message}
        </div>
    )
}

export default Notification