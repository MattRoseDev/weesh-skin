import React from 'react'
import Notification from 'Root/components/global/Notification'
import Link from 'Root/components/global/Link'
import BannerMessage from 'Root/components/global/BannerMessage'
import uuid from 'uuid'
import styled from 'styled-components'
import {NotificationsContext} from 'Root/contexts/notifications'
import {AuthContext} from 'Root/contexts/auth'
import {useSubscription, useMutation, useQuery} from '@apollo/react-hooks'
import api from 'Root/api'
import C from 'Root/constants'
import Meta from 'Root/meta'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.foreground};
    padding: 0 0 1rem;
    min-height: ${window.innerHeight - 55}px;
`

const StyledRequestContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsCenter};
    color: ${({theme}) => theme.colors.foreground};
    padding: 1rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.light};
`

const StyledBadge = styled.div`
    background: ${({theme}) => theme.colors.primary};
    border-radius: 50%;
    width: 0.75rem;
    height: 0.75rem;
`
export default () => {
    const {auth} = React.useContext(AuthContext)
    const {notifications, dispatch: notificationDispatch} = React.useContext(
        NotificationsContext,
    )

    const requestsResponse = useQuery(api.connections.getRequests, {
        fetchPolicy: 'no-cache',
    })

    const [readRequest, readResponse] = useMutation(api.notifications.read)

    React.useEffect(() => {
        if (
            !notifications.isEmpty &&
            Object.values(notifications.store).length > 0 &&
            !Object.values(notifications.store)[0].read
        ) {
            readRequest()
            notificationDispatch({
                type: 'READ_ALL',
            })
        }
    }, [notifications])

    React.useEffect(() => {
        if (readResponse.data) {
            notificationDispatch({
                type: 'READ_ALL',
            })
        }
    }, [readResponse.data])

    return (
        <StyledContainer>
            <Meta />
            {requestsResponse.data &&
                requestsResponse.data.getRequestsUsersConnectionByIdForUser
                    .userConnections.length > 0 && (
                    <Link to={`/${auth.username}/requests`}>
                        <StyledRequestContainer>
                            Follow Requests
                            {requestsResponse.data &&
                                requestsResponse.data
                                    .getRequestsUsersConnectionByIdForUser
                                    .userConnections.length > 0 && (
                                    <StyledBadge />
                                )}
                        </StyledRequestContainer>
                    </Link>
                )}
            {Object.values(notifications.store).length > 0 &&
                Object.values(notifications.store).map(notification => (
                    <Notification key={uuid()} {...notification} />
                ))}
            {notifications.isEmpty && (
                <BannerMessage
                    padding='3rem 0'
                    icon='Bell'
                    title={C.txts.en.g.noNotifications}
                />
            )}
        </StyledContainer>
    )
}
