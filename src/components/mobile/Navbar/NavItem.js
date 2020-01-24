import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import CONSTANTS from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'

const NavItem = styled(NavLink).attrs({
    activeClassName: 'active'
})`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    color: ${CONSTANTS.themes.light.colors.dark};
    border-radius: 50rem;
    padding: .5rem 0;
    width: 100%;
`

const Element = (props) => {
    const { auth } = React.useContext(AuthContext)
    const path = props.path == '/profile' ? `/${auth.username}` : props.path
    return <NavItem exact={props.exact || false} to={path}>{props.children}</NavItem>
}

export default Element