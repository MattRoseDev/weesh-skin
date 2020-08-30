import styled, { css } from 'styled-components'
import C from 'Root/constants'

const Description = styled.p`
    color: ${({ theme, color }) =>
        theme.colors[color || 'foreground']} !important;
    ${({ fontWeight }) =>
        fontWeight &&
        css`
            font-weight: ${fontWeight};
        `};
    ${({ fontSize }) =>
        fontSize &&
        css`
            font-size: ${fontSize};
        `};
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
    border-radius: 0.5rem;
    user-select: text;
`

export default Description
