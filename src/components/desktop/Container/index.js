import React from "react"
import styled, { css } from "styled-components"

const StyledContainer = styled.div`
    ${({ margin }) =>
        margin &&
        css`
            margin: ${margin};
        `};
    ${({ width }) =>
        width
            ? css`
                  min-width: ${width};
                  max-width: ${width};
                  width: ${width};
              `
            : css`
                  min-width: 60rem;
                  max-width: 60rem;
                  width: 60rem;
              `};
`

export default props => {
    return <StyledContainer {...props}>{props.children}</StyledContainer>
}
