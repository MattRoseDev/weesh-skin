import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import Icon from 'Root/components/global/Icon'

const StyledIcon = styled.div`
    ${C.styles.spin};
    ${C.styles.flex.inlineFlexRow};
    color: ${({theme, color}) => theme.colors[color]};
    padding: 0;
    margin: 0;
`

export default props => {
    return (
        <StyledIcon>
            <Icon icon="Loader" {...props} />
        </StyledIcon>
    )
}
