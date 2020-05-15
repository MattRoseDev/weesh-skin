import React from 'react'
import Header from './Header'
import Content from 'Root/app/client/global/Support/Content'
import helpers from 'Root/helpers'
import styled from 'styled-components'

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
`

export default (props) => {
    return <StyledContainer>
        <Header {...props} />
        <Content {...props} />
    </StyledContainer>
}