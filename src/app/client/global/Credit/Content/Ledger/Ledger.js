import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import { Components } from 'Root/StyledComponents'
import diamond from 'Root/public/icons/diamond.svg'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    padding: 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.light};
`

const StyledContent = styled.div`
    ${C.styles.flex.flexColumn};
`

export default () => {
    return (
        <StyledContainer>
            <Components.Global.Avatar size={3} />
            <StyledContent></StyledContent>
        </StyledContainer>
    )
}
