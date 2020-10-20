import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import C from "Root/constants"
import { AuthContext } from "Root/contexts/auth"
import { NotificationsContext } from "Root/contexts/notifications"
import useHistory from "Root/hooks/useHistory"
import Icon from "Root/components/global/Icon"
import Avatar from "Root/components/global/Avatar"
import NotificationBadge from "Root/components/global/NotificationBadge"
import { Components } from "Root/StyledComponents"

const NavItem = styled(NavLink)`
    ${C.styles.flex.flexRowCenter};
    list-style: none;
    color: ${({ theme }) => theme.colors.foreground};
    border-radius: 50rem;
    padding: 0.5rem 0;
    width: 100%;
`

const StyledIcon = styled.span`
    position: relative;
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.justifyContentCenter};
    ${C.styles.flex.alignItemsCenter};
`

const StyledAvatarBorder = styled.span`
    ${C.styles.flex.inlineFlexRow};
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.foreground};
`

export default props => {
    const { auth } = React.useContext(AuthContext)
    const history = useHistory()

    const path = props.path == "/profile" ? `/${auth.username}` : props.path
    return auth.id ? (
        <>
            {props.path == history.location.pathname ||
            (history.location.pathname == `/${auth.username}` &&
                props.path == "/profile") ? (
                <NavItem exact={props.exact || false} to={path}>
                    <StyledIcon>
                        {props.path == "/profile" && (
                            <Components.Global.BadgeForIcon
                                value={auth.isNewTicketMessage}
                            />
                        )}
                        {props.path == "/profile" ? (
                            <StyledAvatarBorder>
                                <Avatar user={auth} size={1.25} />
                            </StyledAvatarBorder>
                        ) : (
                            <Icon
                                color="foreground"
                                strokeWidth={props.fillStrokeWidth || 2}
                                icon={props.content}
                                size={props.size || 26}
                            />
                        )}
                    </StyledIcon>
                </NavItem>
            ) : (
                <NavItem exact={props.exact || false} to={path}>
                    <StyledIcon>
                        {props.path == "/notifications" && (
                            <NotificationBadge />
                        )}
                        {props.path == "/profile" && (
                            <Components.Global.BadgeForIcon
                                value={auth.isNewTicketMessage}
                            />
                        )}
                        {props.path == "/profile" ? (
                            <Avatar user={auth} size={1.35} />
                        ) : (
                            <Icon
                                color="dark"
                                strokeWidth={props.strokeWidth || 2}
                                icon={props.content}
                                size={props.fillSize || 26}
                            />
                        )}
                    </StyledIcon>
                </NavItem>
            )}
        </>
    ) : (
        ""
    )
}
