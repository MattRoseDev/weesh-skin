import React from 'react'
import { SnackBarContext } from 'Root/contexts/snackbar'
import Icon from 'Root/components/global/Icon'
import styled from 'styled-components'
import C from 'Root/constants'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentEnd};
    ${C.styles.flex.alignItemsCenter};
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 20;
    padding: .75rem;
`

const StyledContent = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    min-width: 25rem;
    border-radius: .5rem;
    padding: 1.25rem;
    background: ${({ theme, snackbar }) => theme.colors[snackbar.background] || 'unset'};
    color: ${({ theme, snackbar }) => theme.colors[snackbar.color] || 'unset'};
`

const StyledMessage = styled.div`
    color: inherit;
    font-size: .85rem;
`

const StyledIcon = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    color: inherit;
    padding: 0 .5rem 0 0;
`

export default (props) => {
    const { snackbar } = React.useContext(SnackBarContext)
    return snackbar.visible ? <StyledContainer>
        <StyledContent snackbar={snackbar} {...props}>
            <StyledIcon>
                <Icon icon={snackbar.icon} color={snackbar.color} />
            </StyledIcon>
            <StyledMessage>
                {snackbar.message}
            </StyledMessage>
        </StyledContent>
    </StyledContainer> : ''
}