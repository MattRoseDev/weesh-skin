import React from "react"
import styled, { css } from "styled-components"
import Logo from "Root/components/global/Logo"
import Avatar from "Root/components/global/Avatar"
import Navbar from "Root/components/mobile/Navbar"
import { AuthContext } from "Root/contexts/auth"
import avatar from "Root/public/img/avatar.jpg"
import C from "Root/constants"

const Header = styled.header`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    ${C.styles.flex.justifyContentBetween};
    background: ${({ theme }) => theme.colors.background};
    border: none;
    ${({ borderBottom }) =>
        (borderBottom == undefined || borderBottom == true) &&
        css`
            border-bottom: 1px solid ${({ theme }) => theme.colors.light};
        `};
    padding: ${({ padding }) => padding || "0 .75rem"};
    height: 44px;
    position: sticky;
    top: 0;
    z-index: 2;
`

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)

    return (
        <>
            <Header {...props}>
                {props.children}
                {auth.token && <Navbar />}
            </Header>
        </>
    )
}
