import React from 'react'
import styled from 'styled-components'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'
import Link from 'Root/components/global/Link'

const StyledContainer = styled(Link)`
    ${C.styles.flex.flexRow}
    ${C.styles.flex.alignItemsCenter}
    ${C.styles.boxShadow.primary.normal};
    padding: 1rem;
    margin: .5rem 0 0;
    border-radius: .75rem;
`

const StyledTitle = styled.div`
    margin: 0 0 0 0.5rem;
    font-size: 0.85rem;
    color: ${({theme}) => theme.colors.foreground};
    font-weight: bold;
`

export default () => {
    return (
        <StyledContainer to='/settings/changePassword'>
            <Icon icon='Key' color='foreground' />
            <StyledTitle>Change Password</StyledTitle>
        </StyledContainer>
    )
}
