import React from "react"
import { NotificationsContext } from "Root/contexts/notifications"
import { AuthContext } from "Root/contexts/auth"
import { useSubscription, useMutation, useQuery } from "@apollo/react-hooks"
import api from "Root/api"
import C from "Root/constants"
import helpers from "Root/helpers"

export default () => {
    const { auth } = React.useContext(AuthContext)
    const [isUnreadNotification, setIsUnreadNotification] = React.useState(
        false,
    )
    const { notifications, dispatch: notificationDispatch } = React.useContext(
        NotificationsContext,
    )
    const notificationsResponse = useQuery(api.notifications.getNotifications)

    const subscriptionNotificationsResponse = useSubscription(
        api.notifications.add,
        {
            fetchPolicy: "no-cache",
            variables: {
                recipientId: `${auth.id}`,
            },
        },
    )

    helpers.storage.remove({ key: "invitationCode" })

    React.useEffect(() => {
        if (!isUnreadNotification && notificationsResponse.data) {
            const notifications =
                notificationsResponse.data.getNotificationsUserForUser
                    .notifications
            notificationDispatch({
                type: "PUSH_NOTIFICATION",
                data: notifications,
            })
            notifications.length == 0 &&
                notificationDispatch({
                    type: "EMPTY",
                })
        }
    }, [notificationsResponse, isUnreadNotification])

    React.useEffect(() => {
        if (subscriptionNotificationsResponse.data && !isUnreadNotification) {
            notificationDispatch({
                type: "UNSHIFT_NOTIFICATION",
                data:
                    subscriptionNotificationsResponse.data
                        .addNotificationForUser,
            })
        }
    }, [subscriptionNotificationsResponse.data])

    return ""
}
