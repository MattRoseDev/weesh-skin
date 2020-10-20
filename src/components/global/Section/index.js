import React from "react"
import styled from "styled-components"

const StyledSection = styled.section`
    width: ${({ width }) => width || "100%"};
`

export default ({ children, width }) => {
    return <StyledSection width={width || undefined}>{children}</StyledSection>
}
