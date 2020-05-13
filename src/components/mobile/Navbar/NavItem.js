import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import C from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'
import { NotificationsContext } from 'Root/contexts/notifications'
import useHistory from 'Root/hooks/useHistory'
import Icon from 'Root/components/global/Icon'
import Avatar from 'Root/components/global/Avatar'

const NavItem = styled(NavLink)`
    ${C.styles.flex.flexRowCenter};
    list-style: none;
    color: ${({theme}) => theme.colors.foreground};
    border-radius: 50rem;
    padding: .5rem 0;
    width: 100%;
`

const StyledIcon = styled.span`
    position: relative;
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    ${C.styles.flex.alignItemsCenter};
`

const StyledBadge = styled.span`
    position: absolute;
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    ${C.styles.flex.alignItemsCenter};
    top: -.3rem;
    right: -.1rem;
    border-radius: 5rem;
    border: 3px solid ${({theme}) => theme.colors.background};
    min-height: .5rem; 
    min-width: .5rem; 
    font-size: .75rem;
    background: ${({theme}) => theme.colors.red};
    color: ${({theme}) => theme.colors.background};
`

export default (props) => {
    const { auth } = React.useContext(AuthContext)
    const { notifications } = React.useContext(NotificationsContext)
    const lastNotification = Object.values(notifications.store).length > 0 && Object.values(notifications.store)[0]
    const history = useHistory()

    const path = props.path == '/profile' ? `/${auth.username}` : props.path
    return auth.id ? <>
        {props.path == history.location.pathname || 
            history.location.pathname == `/${auth.username}` && props.path == '/profile' ? 
        <NavItem exact={props.exact || false} to={path}>
            <StyledIcon>
                {props.path == '/profile' ? <Avatar user={auth} size={1.5} /> : <Icon color='foreground'
                    strokeWidth={props.fillStrokeWidth || 2}
                    icon={props.content}
                    size={props.size || 26} />}
            </StyledIcon>
        </NavItem> : 
        <NavItem exact={props.exact || false} to={path}>
            <StyledIcon>
                {(lastNotification && !lastNotification.read && props.path == '/notifications') && <StyledBadge></StyledBadge>}
                {props.path == '/profile' ? <Avatar user={auth} size={1.5} /> : <Icon color='dark'
                    strokeWidth={props.strokeWidth || 2}
                    icon={props.content}
                    size={props.fillSize || 26} />}
            </StyledIcon>
        </NavItem>}
    </> : ''
}
