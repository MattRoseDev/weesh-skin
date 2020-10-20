import React from "react"
import styled, { css } from "styled-components"

const StyledContainer = styled.div`
    ${({ theme, leftWidth, leftStyle, leftColor }) =>
        (leftWidth || leftStyle || leftColor) &&
        css`
            border-left: ${leftWidth || "1px"} ${leftStyle || "solid"}
                ${theme.colors[leftColor || "light"]};
        `};
    ${({ theme, rightWidth, rightStyle, rightColor }) =>
        (rightWidth || rightStyle || rightColor) &&
        css`
            border-right: ${rightWidth || "1px"} ${rightStyle || "solid"}
                ${theme.colors[rightColor || "light"]};
        `};
    ${({ theme, topWidth, topStyle, topColor }) =>
        (topWidth || topStyle || topColor) &&
        css`
            border-top: ${topWidth || "1px"} ${topStyle || "solid"}
                ${theme.colors[topColor || "light"]};
        `};
    ${({ theme, bottomWidth, bottomStyle, bottomColor }) =>
        (bottomWidth || bottomStyle || bottomColor) &&
        css`
            border-bottom: ${bottomWidth || "1px"} ${bottomStyle || "solid"}
                ${theme.colors[bottomColor || "light"]};
        `};
`

export default props => {
    return <StyledContainer {...props}>{props.children}</StyledContainer>
}
