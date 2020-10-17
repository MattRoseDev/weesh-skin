import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'

const StyledContainer = styled.section`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsCenter};
`

const StyledTitle = styled.span`
    border-radius: 50rem;
    background-color: ${({ theme }) => theme.colors.foreground};
    color: ${({ theme }) => theme.colors.background};
    padding: 0.5rem 1rem;
    margin: 2rem;
    font-weight: bold;
`

export default props => {
    return (
        <StyledContainer>
            <StyledTitle>{props.title}</StyledTitle>
            {props.children}
        </StyledContainer>
    )
}
