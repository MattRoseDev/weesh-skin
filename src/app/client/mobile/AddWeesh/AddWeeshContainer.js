import React from 'react'
import Header from './Header'
import Content from 'Root/app/client/global/AddWeesh/Content'
import helpers from 'Root/helpers'
import styled from 'styled-components'
import { AuthContext } from 'Root/contexts/auth'

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
`

export default (props) => {
    const { auth, dispatch } = React.useContext(AuthContext)
    return <StyledContainer>
        <Header {...props} />
        <Content {...props} />
    </StyledContainer>
}