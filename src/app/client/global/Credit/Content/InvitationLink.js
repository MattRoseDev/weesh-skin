import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsCenter};
    margin: 1rem;
`

const StyledCodeTitle = styled.label`
    /* font-weight: bold; */
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray};
`

const StyledCode = styled.span`
    /* font-weight: bold; */
    margin: 0.5rem 0 0;
    font-size: 2rem;
    letter-spacing: 0.25rem;
    color: ${({ theme }) => theme.colors.foreground};
`
export default props => {
    return (
        <StyledContainer>
            <StyledCodeTitle>{C.txts.en.credit.invitationCode}</StyledCodeTitle>
            <StyledCode>{props.invitationCode}</StyledCode>
        </StyledContainer>
    )
}
