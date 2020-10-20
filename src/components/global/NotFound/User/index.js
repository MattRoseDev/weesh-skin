import React from "react"
import styled from "styled-components"
import C from "Root/constants"
import Icon from "Root/components/global/Icon"

const StyledContaner = styled.div`
    height: 100%;
    width: 100%;
    ${C.styles.flex.flexColumnCenter};
    color: ${({ theme }) => theme.colors.dark};
`
const StyledMessage = styled.div`
    margin: 1rem 0 0;
`

export default props => {
    return (
        <StyledContaner {...props}>
            <Icon icon="User" size={60} strokeWidth={1.5} color="dark" />
            <StyledMessage>User Not Found</StyledMessage>
        </StyledContaner>
    )
}
