import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
    color: unset;
    text-decoration: none;
`

const StyledCountItem = styled.div`
    color: unset;
    text-decoration: none;
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsCenter};
`

const StyledContainer = styled.div`
    
    ${({margin}) => margin && css`
        margin: ${margin};
    `};
    ${({width}) => width && css`
        width: ${width};
    `};
`

const StyledNumber = styled.span`
    color: ${({theme}) => theme.colors.foreground};
    font-weight: bold;
    font-size: 1rem;
`

const StyledTitle = styled.span`
    color: ${({theme}) => theme.colors.dark};
    font-size: .75rem;
    margin: 0 0 0 .25rem;
`

export default (props) => {
    return <StyledContainer {...props}>
        {props.to ? <StyledLink to={props.to}>
            <StyledCountItem>
                <StyledNumber>{props.number}</StyledNumber>
                <StyledTitle>{props.title}</StyledTitle>
            </StyledCountItem>
        </StyledLink> : <StyledCountItem>
            <StyledNumber>{props.number}</StyledNumber>
            <StyledTitle>{props.title}</StyledTitle>
        </StyledCountItem>}
    </StyledContainer>
}