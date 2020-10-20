import React from "react"
import styled, { css } from "styled-components"

const StyledBadge = styled.span`
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    width: ${({ width }) => (width ? width : ".5rem")};
    height: ${({ width }) => (width ? width : ".5rem")};
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
`

export default props => {
    return (
        <StyledBadge
            margin={props.margin || undefined}
            padding={props.padding || undefined}
            width={props.width || undefined}
        />
    )
}
