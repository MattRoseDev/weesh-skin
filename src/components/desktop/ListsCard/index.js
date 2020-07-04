import React from 'react'
import styled, {css} from 'styled-components'
import C from 'Root/constants'
import uuid from 'uuid'

const StyledContainer = styled.div`
    ${C.styles.boxShadow.primary.normal};
    border-radius: 0.75rem;
`

const StyledTitle = styled.div`
    color: ${({theme}) => theme.colors.foreground};
    font-weight: bolder;
    font-size: 1.25rem;
    padding: 1rem;
`

const StyledItem = styled.div`
    padding: 0.5rem;
    border-top: 1px dashed ${({theme}) => theme.colors.light};
`

export default props => {
    return (
        <StyledContainer {...props}>
            {props.title && <StyledTitle>{props.title}</StyledTitle>}
            {props.items &&
                props.items.map(item => (
                    <StyledItem key={uuid()}>{item}</StyledItem>
                ))}
        </StyledContainer>
    )
}
