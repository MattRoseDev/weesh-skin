import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import avatar from 'Root/public/img/avatar.jpg'
import CONSTANTS from 'Root/constants'

const StyledLink = styled(Link)`
    color: unset;
    text-decoration: none;
`

const StyledContainer = styled.div``

const StyledAvatar = styled.div`
    background-color: ${CONSTANTS.themes.light.colors.white};
    background-image: url(${({ src }) => src || avatar });
    width: ${({ size }) => size || 2 }rem;
    height: ${({ size }) => size || 2 }rem;
    border-width: ${({ borderWidth }) => borderWidth || 1 }px;
    border-style: solid;
    border-color: ${({ borderColor }) => borderColor ? CONSTANTS.themes.light.colors[borderColor] : CONSTANTS.themes.light.colors.lightGray };
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    display: block;
    ${({ boxShadow }) => boxShadow && css`
        box-shadow: 1px 1px 3px 1px ${CONSTANTS.themes.light.colors[boxShadow]};
    `}
`

const StyledImg = styled.img`
    display: none;
`

const Element = (props) => {
    return <>
        {props.to ? <StyledLink to={props.to}>
            <StyledAvatar {...props} />
            <StyledImg src={props.src} />
        </StyledLink>
        :
        <StyledContainer to={props.to}>
            <StyledAvatar {...props} />
            <StyledImg src={props.src} />
        </StyledContainer>
        }
    </>
}

export default Element