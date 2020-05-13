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
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    list-style: none;
    color: ${({theme}) => theme.colors.foreground};
    background: ${({ theme, background }) => background ? theme.colors[background] : 'transparent'};
    border-radius: .75rem;
    text-decoration: none;
    width: 100%;
    margin: .25rem 0 0;
    padding: .75rem 1rem .75rem .75rem;
    font-size: .9rem;
    font-weight: bold;
`

const NavTitle = styled.span`
    color: ${({ theme, color }) => theme.colors[color || 'foreground']};
    
`

const StyledIcon = styled.span`
    position: relative;
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    ${C.styles.flex.alignItemsCenter};
    margin: 0 .5rem 0 0;
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
        <NavItem background='foreground' exact={props.exact || false} to={path}>
            <StyledIcon>
                {props.path == '/profile' ? <Avatar user={auth} size={1.5} /> : <Icon color='background'
                    strokeWidth={props.fillStrokeWidth || 2}
                    icon={props.content}
                    size={props.size || 26} />}
            </StyledIcon>
            <NavTitle color='background'>{props.title}</NavTitle>
        </NavItem> : 
        <NavItem exact={props.exact || false} to={path}>
            <StyledIcon>
                {(lastNotification && !lastNotification.read && props.path == '/notifications') && <StyledBadge></StyledBadge>}
                {props.path == '/profile' ? <Avatar user={auth} size={1.5} /> : <Icon color='dark'
                    strokeWidth={props.strokeWidth || 2}
                    icon={props.content}
                    size={props.fillSize || 26} />}
            </StyledIcon>
            <NavTitle color='dark'>{props.title}</NavTitle>
        </NavItem>}
    </> : ''
}
