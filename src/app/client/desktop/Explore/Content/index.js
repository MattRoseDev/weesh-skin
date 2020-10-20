import React from "react"
import Header from "./Header"
import Main from "./Main"
import helpers from "Root/helpers"
import styled from "styled-components"

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    min-height: ${window.innerHeight - 55}px;
`

export default props => {
    return (
        <StyledContainer>
            <Header {...props} />
            <Main {...props} />
        </StyledContainer>
    )
}
