import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import Icon from 'Root/components/global/Icon'
import Loader from 'Root/components/global/Loader'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
    ${C.styles.flex.flexRow};
    text-decoration: none;
    cursor: ${({ cursor }) => cursor || 'pointer'};
`

const StyledContainer = styled.div`
    /* margin: ${({ margin }) => margin || 'unset'}; */
    width: ${({ width }) => width ? `${width}` : 'unset'};
    ${C.styles.flex.flexRow};
    position: relative;
    cursor: ${({ cursor }) => cursor || 'pointer'};

`

const StyledButton = styled.button`
    cursor: inherit;
    ${({ boxShadow }) => boxShadow && css`
        p: 1px 1px 3px 1px ${({theme}) => theme.colors.light};
    `};
    border: none;
    border-width: ${({ borderWidth }) => borderWidth || '0px'};
    border-color: ${({ theme, borderColor }) => theme.colors[borderColor] || 'transparent'};
    border-style: ${({ borderStyle }) => borderStyle || 'solid'};
    ${C.styles.flex.flexRowCenter};
    font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
    border-radius: ${({ radius }) => radius || '.75rem'};
    font-size: ${({ fontSize }) => fontSize || '.85rem'};
    width: 100%;
    ${({ padding }) => padding && css`
        padding: ${padding};
    `};
    ${({ margin }) => margin && css`
        margin: ${margin};
    `};
    ${({ color, theme }) => color && css`
        color: ${theme.colors[color]};
    `};
    background: ${({ background, theme }) => background ? theme.colors[background] : 'transparent'};
    ${({ hoverBackground, theme }) => hoverBackground && css`
        &:hover {
            background: ${theme.colors[hoverBackground]};
            transition: all .2s ease;
        }
    `};
    transition: all .2s ease;
    outline: none;
`

const StyledLoader = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    padding: 0;
    margin: 0;
    ${C.styles.flex.flexRowCenter};
    ${({ theme, color }) => color && css`
        color: ${theme.colors[color]};
    `};
    background: ${({ theme, background }) => background ? theme.colors[background] : 'transparent'};
    border-radius: ${({ radius }) => radius || '.75rem'};
`

export default (props) => {
    return props.to ? <StyledLink {...props}>
        <ContentButton {...props} />
    </StyledLink> : <StyledContainer {...props}>
        {props.isLoading && <StyledLoader {...props}><Loader size={props.loaderSize || undefined} color={props.color}/></StyledLoader>}
        <ContentButton {...props} />
    </StyledContainer>
}

const ContentButton = (props) => {
    return <StyledButton {...props} onClick={props.clickEvent || undefined}>
        {props.children}
    </StyledButton>
}