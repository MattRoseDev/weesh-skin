import React from 'react'
import styled, { css } from 'styled-components'
import CONSTANTS from 'Root/constants'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
    color: unset;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    color: ${CONSTANTS.themes.light.colors.black};
    font-weight: bold;
    font-size: 1rem;
`

const StyledTitle = styled.span`
    color: ${CONSTANTS.themes.light.colors.dark};
    font-size: .75rem;
    margin: 0 0 0 .25rem;
`

const Element = (props) => {
    return <StyledContainer {...props}>
        <StyledLink to={props.to}>
            <StyledNumber>{props.number}</StyledNumber>
            <StyledTitle>{props.title}</StyledTitle>
        </StyledLink>
    </StyledContainer>
}

export default Element