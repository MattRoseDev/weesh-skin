import React from 'react'
import { AuthContext } from 'Root/contexts/auth'
import Showcase from 'Root/app/client/global/Home/Showcase'
import Main from './Main'
import styled from 'styled-components'

const StyledContainer = styled.div``

export default () => {
    const { auth } = React.useContext(AuthContext)
    return <StyledContainer>
        {!auth.token ? <Showcase /> : <Main/>}
    </StyledContainer>
}