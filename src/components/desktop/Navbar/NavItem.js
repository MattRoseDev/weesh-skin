import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import C from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'
import useHistory from 'Root/hooks/useHistory'
import Icon from 'Root/components/global/Icon'
import Avatar from 'Root/components/global/Avatar'
import NotificationBadge from 'Root/components/global/NotificationBadge'

const NavItemContent = styled.div`
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    color: ${({ theme, color }) => theme.colors[color || 'foreground']};
    list-style: none;
    transition: all .2s ease;
    /* background: ${({ theme, background }) =>
        background ? theme.colors.lightPrimary : 'transparent'}; */
    border-radius: .75rem;
    /* width: 100%; */
    padding: .75rem 1rem .75rem .75rem;
    font-size: .9rem;
    font-weight: bold;
`

const NavItem = styled(NavLink)`
    &:hover ${NavItemContent} {
        color: ${({ theme, color }) => theme.colors.primary};
        background: ${({ theme }) => theme.colors.lightPrimary};
        transition: all 0.2s ease;
    }
    &:hover svg {
        stroke: ${({ theme, color }) => theme.colors.primary};
        transition: all 0.2s ease;
    }
    transition: all 0.2s ease;
    text-decoration: none;
    margin: 0.25rem 0 0;
    width: 80%;
`

const NavTitle = styled.span`
    color: inherit;
`

const StyledIcon = styled.span`
    position: relative;
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    ${C.styles.flex.alignItemsCenter};
    margin: 0 0.5rem 0 0;
`

export default props => {
    const { auth } = React.useContext(AuthContext)

    const history = useHistory()

    const path = props.path == '/profile' ? `/${auth.username}` : props.path
    return auth.id ? (
        <>
            {props.path == history.location.pathname ||
            (history.location.pathname == `/${auth.username}` &&
                props.path == '/profile') ? (
                <NavItem color='primary' exact={props.exact || false} to={path}>
                    <NavItemContent background='foreground' color='primary'>
                        <StyledIcon>
                            {props.path == '/notifications' && (
                                <NotificationBadge />
                            )}
                            {props.path == '/profile' ? (
                                <Avatar user={auth} size={1.5} />
                            ) : (
                                <Icon
                                    color={`${auth.color}`}
                                    strokeWidth={props.fillStrokeWidth || 2}
                                    icon={props.content}
                                    size={props.size || 26}
                                />
                            )}
                        </StyledIcon>
                        <NavTitle>{props.title}</NavTitle>
                    </NavItemContent>
                </NavItem>
            ) : (
                <NavItem
                    color='foreground'
                    exact={props.exact || false}
                    to={path}
                >
                    <NavItemContent color='foreground'>
                        <StyledIcon>
                            {props.path == '/notifications' && (
                                <NotificationBadge />
                            )}
                            {props.path == '/profile' ? (
                                <Avatar user={auth} size={1.5} />
                            ) : (
                                <Icon
                                    color='foreground'
                                    strokeWidth={props.strokeWidth || 2}
                                    icon={props.content}
                                    size={props.fillSize || 26}
                                />
                            )}
                        </StyledIcon>
                        <NavTitle>{props.title}</NavTitle>
                    </NavItemContent>
                </NavItem>
            )}
        </>
    ) : (
        ''
    )
}
