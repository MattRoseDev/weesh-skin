import React from 'react'
import Icon from 'Root/components/global/Icon'
import styled, {css} from 'styled-components'
import C from 'Root/constants'

const StyledContainer = styled.div`
    position: relative;
    overflow: hidden;
    ${({radius}) =>
        radius &&
        css`
            border-radius: ${radius};
            ${C.styles.flex.inlineFlexRow};
        `};
`

const StyledIcon = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    ${C.styles.flex.flexRowCenter};
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
`

export default props => {
    return (
        <StyledContainer {...props}>
            <StyledIcon>
                <Icon icon={props.icon || 'Camera'} color="white" size={26} />
            </StyledIcon>
            {props.children}
        </StyledContainer>
    )
}
