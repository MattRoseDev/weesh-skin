import React from 'react'
import styled, { css } from 'styled-components'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'

const StyledContainer = styled.div`
    ${C.styles.boxShadow.primary.normal};
    width: ${({ width }) => width || 'unset'};
    margin: ${({ margin }) => margin || 'unset'};
    ${C.styles.flex.inlineFlexRow};
    ${C.styles.flex.alignItemsCenter};
    ${C.styles.flex.justifyContentStart};
    color: ${({ theme }) => theme.colors.red};
    padding: 0.75rem 0;
    border-radius: 0.75rem;
    font-size: 0.75rem;
`

const StyledIcon = styled.div`
    padding: 0 0.25rem 0 0.5rem;
    ${C.styles.flex.flexRowCenter};
`

export default props => {
    return (
        <StyledContainer
            width={props.width || undefined}
            margin={props.margin || undefined}>
            <StyledIcon>
                <Icon size='18' icon='X' color='red' />
            </StyledIcon>
            {props.message}
        </StyledContainer>
    )
}
