import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import Input from 'Root/components/global/Input'
import ErrorMessage from 'Root/components/global/ErrorMessage'
import { useMutation } from '@apollo/react-hooks'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import { AuthContext } from 'Root/contexts/auth'
import { SnackBarContext } from 'Root/contexts/snackbar'
import Button from 'Root/components/global/Button'
import Meta from 'Root/meta'
import Diamond from './Diamond'
import InvitationLink from './InvitationLink'
import Transactions from './Transactions'
import StyledComponents, { Components } from 'Root/StyledComponents'

const StyledContainer = styled.div`
    min-height: ${window.innerHeight - 55}px;
    padding: 0 0 3.5rem;
`

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(
        SnackBarContext,
    )
    const history = useHistory()

    return auth.id ? (
        <StyledContainer>
            <Meta type='Credit' />
            <Diamond value={auth.credit} />
            <InvitationLink invitationCode={auth.invitationCode || undefined} />
            <Transactions />
        </StyledContainer>
    ) : (
        <Components.Global.Loading
            padding='3rem 0 0'
            size={28}
            strokeWidth={1.25}
            color='gray'
        />
    )
}
