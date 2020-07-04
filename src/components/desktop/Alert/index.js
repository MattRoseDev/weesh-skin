import React from 'react'
import { AlertContext } from 'Root/contexts/alert'
import Icon from 'Root/components/global/Icon'
import styled from 'styled-components'
import C from 'Root/constants'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
    ${C.styles.flex.alignItemsCenter};
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 20;
`

const StyledContent = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    width: 100%;
    padding: 1.25rem;
    background: ${({ theme, alert }) =>
        theme.colors[alert.background] || 'unset'};
    color: ${({ theme, alert }) => theme.colors[alert.color] || 'unset'};
`

const StyledMessage = styled.div`
    color: inherit;
    font-size: 0.85rem;
`

const StyledIcon = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    color: inherit;
    padding: 0 0.5rem 0 0;
`

export default props => {
    const { alert } = React.useContext(AlertContext)
    return alert.visible ? (
        <StyledContainer>
            <StyledContent alert={alert} {...props}>
                <StyledIcon>
                    <Icon icon={alert.icon} color={alert.color} />
                </StyledIcon>
                <StyledMessage>{alert.message}</StyledMessage>
            </StyledContent>
        </StyledContainer>
    ) : (
        ''
    )
}
