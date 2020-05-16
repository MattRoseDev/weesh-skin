import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import Icon from 'Root/components/global/Icon'
import { Link } from 'react-router-dom'

const StyledTag = styled(Link)`
    color: ${({ theme }) => theme.colors.blue};
    ${C.styles.flex.inlineFlexRow};
    text-decoration: none;
    font-size: inherit;
`

export default (props) => {
    return <StyledTag to={props.to}>
        {props.children}
    </StyledTag>
}