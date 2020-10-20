import React from "react"
import styled from "styled-components"
import { AuthContext } from "Root/contexts/auth"
import Auth from "Root/components/mobile/Auth"
import Link from "Root/components/global/Link"
import routes from "./routes"
import guestRoute from "./guestRoute"
import NavItem from "./NavItem"
import NavItems from "./NavItems"
import uuid from "uuid"
import C from "Root/constants"

const NavStyled = styled.nav`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentBetween};
    height: 100%;
    padding: 0 0 1rem;
`

const StyledButtons = styled.div`
    padding: 1rem;
    font-size: 0.65rem;
`

const StyledButton = styled(Link)`
    color: ${({ theme }) => theme.colors.dark};
    text-transform: uppercase;
    font-weight: bold;
    margin: 0 0.2rem 0 0;
`

const StyledGray = styled.span`
    color: ${({ theme }) => theme.colors.dark};
`

export default () => {
    const { auth } = React.useContext(AuthContext)

    return (
        <NavStyled>
            {auth.token ? (
                <NavItems>
                    {routes.map(item => (
                        <NavItem key={uuid()} {...item}>
                            {item.content}
                        </NavItem>
                    ))}
                </NavItems>
            ) : (
                <NavItems>
                    {guestRoute.map(item => (
                        <NavItem key={uuid()} {...item}>
                            {item.content}
                        </NavItem>
                    ))}
                </NavItems>
            )}
        </NavStyled>
    )
}
