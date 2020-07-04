import React from 'react'
import styled from 'styled-components'

import routes from './routes'
import NavItem from './NavItem'
import NavItems from './NavItems'
import uuid from 'uuid'

const NavStyled = styled.nav`
    /* border-top: 1px solid lightgray; */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
`

const Element = () => {
    return (
        <NavStyled>
            <NavItems>
                {routes.map(item => (
                    <NavItem key={uuid()} {...item}>
                        {item.content}
                    </NavItem>
                ))}
            </NavItems>
        </NavStyled>
    )
}

export default Element
