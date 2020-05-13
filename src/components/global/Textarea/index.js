import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import Textarea from './Textarea'
import Icon from 'Root/components/global/Icon'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${({width}) => width && css`
        width: ${width}%;
    `};
    ${({ margin}) => margin && css`
        margin: ${margin};
    `};
`

const StyledFrame = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.boxShadow.primary.normal};
    background: ${({theme}) => theme.colors.background};
    /* ${C.styles.flex.alignItemsCenter}; */
    width: 100%;
    border-radius: .75rem;
    padding: ${({ padding }) => padding ? padding : '.75rem'};
`

const StyledLabel = styled.label`
    font-size: .75rem;
    color: ${({theme}) => theme.colors.gray};
    margin: 0 0 .25rem;
`

export default (props) => {
    return <StyledContainer {...props}>
        <StyledFrame {...props}>
            {props.label && <StyledLabel>{props.label}</StyledLabel>}
            <Textarea {...props}/>
        </StyledFrame>
    </StyledContainer>
}