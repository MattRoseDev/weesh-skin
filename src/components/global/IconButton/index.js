import React from 'react'
import styled from 'styled-components'
import Icon from 'Root/components/global/Icon'

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    padding: 0;
    border: none;
    background: unset;
`

const Element = (props) => {
    return <StyledButton>
        <Icon {...props} />
    </StyledButton>
}

export default Element