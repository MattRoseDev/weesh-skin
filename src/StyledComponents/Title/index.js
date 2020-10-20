import styled, { css } from "styled-components"
import C from "Root/constants"

const Title = styled.span`
    color: ${({ color, theme }) => theme.colors[color || "foreground"]};
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
    ${({ fontSize }) =>
        fontSize &&
        css`
            font-size: ${fontSize};
        `};
    ${({ fontWeight }) =>
        fontWeight &&
        css`
            font-weight: ${fontWeight};
        `};
    ${({ textAlign }) =>
        textAlign &&
        css`
            text-align: ${textAlign};
        `};
    ${({ textTransform }) =>
        textTransform &&
        css`
            text-transform: ${textTransform};
        `};
`

export default Title
