import React from 'react'
import styled, {css} from 'styled-components'
import {AuthContext} from 'Root/contexts/auth'

const StyledMain = styled.main`
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.foreground};
`

export default props => {
    const {auth} = React.useContext(AuthContext)
    return <StyledMain>{props.children}</StyledMain>
}
