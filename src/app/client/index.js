import React from 'react'
import Mobile from './mobile'
import Desktop from './desktop'
import { useSubscription, useLazyQuery, useQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import { SnackBarContext } from 'Root/contexts/snackbar'
import { NotificationsContext } from 'Root/contexts/notifications'
import { ThemeProvider } from 'styled-components'
import api from 'Root/api'
import C from 'Root/constants'
import GlobalStyles from 'Root/constants/globalStyles'

const Client = (props) => {
    const { auth, dispatch: authDispatch } = React.useContext(AuthContext)
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(SnackBarContext)
    const { notifications, dispatch } = React.useContext(NotificationsContext)
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    window.addEventListener('resize',() => {
        setWindowWidth(window.innerWidth)
    })
    
    const { data, error } = useSubscription(api.notifications.add,{
        variables: {
            userId: `${auth.id}`
        }
    })

    const [loadNotifications, loadResult] = useLazyQuery(api.notifications.getNotifications)
    const [getProfileUser, getProfileUserResult] = useLazyQuery(api.auth.getUserProfile) 

    React.useEffect(() => {
        if (!auth.id) {
            getProfileUser()
        }  
        if(error) {
            console.log(error)
        }

        if (!loadResult.called && !notifications.isEmpty && !Object.values(notifications.store).length) {
            loadNotifications()
        }

        if (loadResult.called && loadResult.data) {
            if (loadResult.data.getNotificationsUserForUser.notifications.length > 0) {
                () => dispatch({
                    type: 'PUSH_NOTIFICATION',
                    data: loadResult.data.getNotificationsUserForUser.notifications,
                })
            } else {
                dispatch({
                    type: 'EMPTY',
                })
            }
        }

        if (data) {
            dispatch({
                type: 'UNSHIFT_NOTIFICATION',
                data: data.addNotificationForUser
            })
        }

        if (getProfileUserResult.data) {
            authDispatch({
                type: 'LOGIN',
                data: getProfileUserResult.data.getUserProfileForUser
            })
             
        }
    }, [data, loadResult.data, getProfileUserResult.data])

    return <ThemeProvider theme={{
                colors: {
                    ...C.themes[auth.theme || 'light'].colors,
                    ...C.themes[auth.theme || 'light'].colors[`${auth.color}Pack`]
                }
            }}>
            <>
                <GlobalStyles />
                {windowWidth > 768 ? <Desktop /> : <Mobile />}
            </>
    </ThemeProvider>
}

export default Client