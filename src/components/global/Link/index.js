import React from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import C from "Root/constants"

const StyledContainer = styled(Link)`
    text-decoration: none;
    color: unset;
    ${({ width }) =>
        width &&
        css`
            width: ${width};
        `};
`

export default props => {
    return <StyledContainer {...props}>{props.children}</StyledContainer>
}
