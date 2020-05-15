import React from 'react'
import Notification from 'Root/components/global/Notification'
import Link from 'Root/components/global/Link'
import BannerMessage from 'Root/components/global/BannerMessage'
import helpers from 'Root/helpers'
import uuid from 'uuid'
import styled from 'styled-components'
import { NotificationsContext } from 'Root/contexts/notifications'
import { AuthContext } from 'Root/contexts/auth'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import api from 'Root/api'
import C from 'Root/constants'

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    padding: 0 0 3.5rem;
`

const StyledRequestContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsCenter};
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
`

const StyledBadge = styled.div`
    background: ${({theme}) => theme.colors.blue};
    border-radius: 50%;
    width: .75rem;
    height: .75rem;
`

export default () => {
    const { auth } = React.useContext(AuthContext)
    const { notifications, dispatch } = React.useContext(NotificationsContext)
    const loadRequestsResponse = useQuery(api.connections.getRequests,{
        fetchPolicy: 'no-cache',
    })
    const [loadNotifications, loadNotificationsResponse] = useLazyQuery(api.notifications.getNotifications,{
        fetchPolicy: 'no-cache',
    })
    const [readNotifications, readNotificationsResponse] = useMutation(api.notifications.read,{
        fetchPolicy: 'no-cache',
    })

    React.useEffect(() =>{
        if (!loadNotificationsResponse.data && !loadNotificationsResponse.called && !notifications.isEmpty && !Object.values(notifications.store).length) {
            loadNotifications()
        } 

        if (!notifications.isEmpty && Object.values(notifications.store).length > 0 && !Object.values(notifications.store)[0].read ) {
            readNotifications()
            dispatch({
                type: 'READ_ALL',
            })
        }
        
        if(loadNotificationsResponse.data) {
            dispatch({
                type: 'PUSH_NOTIFICATION',
                data: loadNotificationsResponse.data.getNotificationsUserForUser.notifications
            })
        }
    },[
        loadRequestsResponse.data,
        loadNotificationsResponse.data, 
        readNotificationsResponse.data,
    ])

    return <StyledContainer>
        {loadRequestsResponse.data && loadRequestsResponse.data.getRequestsUsersConnectionByIdForUser.userConnections.length > 0 && <Link to={`/${auth.username}/requests`}>
            <StyledRequestContainer>
                Follow Requests
                {loadRequestsResponse.data && loadRequestsResponse.data.getRequestsUsersConnectionByIdForUser.userConnections.length > 0 && <StyledBadge/>}
            </StyledRequestContainer>
        </Link>}
        {(Object.values(notifications.store).length > 0) && Object.values(notifications.store).map(notification => (<Notification key={uuid()} {...notification} />))}
        {/* {<BannerMessage padding='3rem 0' icon='Bell' title={C.txts.en.g.noNotifications} />} */}
    </StyledContainer>
}