import React from 'react'
import styled from 'styled-components'
import Connection from 'Root/app/client/global/UserProfile/Content/Header/Content/Connection/index'
import Main from './Main'
import C from 'Root/constants'
import { UserContext } from 'Root/contexts/user'
import { useSubscription } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledContent = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsEnd};
    /* box-shadow: 1px 1px 3px 1px ${({ theme }) => theme.colors.light}; */
    padding: 0 0 .5rem;
    border-radius: 0 0 .75rem .75rem;
`

const StyledButtonContainer = styled.div`
    padding: 0.75rem 0.75rem 1.5rem;
`

export default props => {
    const { user } = React.useContext(UserContext)

    return (
        <StyledContent>
            <StyledButtonContainer>
                <Connection {...props} />
            </StyledButtonContainer>
            {user && <Main {...props} />}
        </StyledContent>
    )
}
