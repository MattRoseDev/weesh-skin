import React from "react"
import Container from "Root/components/desktop/Container"
import Border from "Root/components/global/Border"
import C from "Root/constants"
import styled from "styled-components"
import Header from "./Header"
import Content from "Root/app/client/global/Support/Content"
import Second from "Root/app/client/desktop/Second/General"

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledSection = styled.div`
    ${C.styles.flex.flexColumn};
`

export default props => {
    return (
        <StyledContainer>
            <Border leftColor="light" rightColor="light">
                <Container width="38rem">
                    <StyledSection>
                        <Header {...props} />
                        <Content {...props} />
                    </StyledSection>
                </Container>
            </Border>
            <Container width="24rem">
                <Second {...props} />
            </Container>
        </StyledContainer>
    )
}
