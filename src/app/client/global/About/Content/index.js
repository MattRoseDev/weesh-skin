import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid'
import C from 'Root/constants'

const StyledContainer = styled.div``

const StyledTitle = styled.div`
    text-align: center;
    padding: .5rem;
`

export default (props) => {
    return <StyledContainer>
        <StyledTitle>
            Version 1.0.0
        </StyledTitle>
        <StyledTitle>
            © 2020 WEESH 
        </StyledTitle>
    </StyledContainer>
}