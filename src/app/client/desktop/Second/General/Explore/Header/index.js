import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Auth from 'Root/components/mobile/Auth'
import Navbar from 'Root/components/mobile/Navbar'
import { AuthContext } from 'Root/contexts/auth'
import Input from './Input'
import C from 'Root/constants'

const Header = styled.header`
    background: ${({ theme }) => theme.colors.background};
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsCenter};
    padding: 1rem 0.5rem 0;
    position: sticky;
    top: 0;
`

export default () => {
    const { auth } = React.useContext(AuthContext)
    return (
        <Header>
            <Input />
        </Header>
    )
}
