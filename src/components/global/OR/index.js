import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'

const StyledOR = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    width: ${({ width }) => (width ? `${width}%` : 'unset')};
    margin: ${({ margin }) => (margin ? `${margin}rem` : 'auto')} 0;
`

const StyledLine = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.colors.light};
    flex-grow: 1;
`

const StyledLabel = styled.div`
    margin: 0 1rem;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.gray};
`

export default props => {
    return (
        <StyledOR {...props}>
            <StyledLine />
            <StyledLabel>{C.txts.en.g.or}</StyledLabel>
            <StyledLine />
        </StyledOR>
    )
}
