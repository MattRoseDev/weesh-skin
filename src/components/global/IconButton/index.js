import React from 'react'
import styled from 'styled-components'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'

const StyledButton = styled.button`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 0;
    border: none;
    background: unset;
    cursor: pointer;
`

export default (props) => {
    return <StyledButton>
        <Icon {...props} />
    </StyledButton>
}