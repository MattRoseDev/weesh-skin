import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import { useMutation } from '@apollo/react-hooks'
import useHistory from 'Root/hooks/useHistory'
import { AuthContext } from 'Root/contexts/auth'
import Meta from 'Root/meta'
import Diamond from './Diamond'
import Transactions from './Transactions'
import InvitationCode from './InvitationCode'
import StyledComponents, { Components } from 'Root/StyledComponents'

const StyledContainer = styled.div`
    min-height: ${window.innerHeight - 55}px;
    padding: 0 0 3.5rem;
`

const StyledButton = styled(Components.Global.Link)`
    display: block;
    width: 100%;
    text-align: center;
    border-top: 1px solid ${({ theme }) => theme.colors.light};
    font-size: 1.25rem;
    padding: 0.5rem;
    cursor: pointer;
`

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const history = useHistory()

    return auth.id ? (
        <StyledContainer>
            <Meta type='Credit' />
            <Diamond value={auth.credit} />
            <StyledComponents.Flex.Row>
                <InvitationCode />
                <StyledButton to='/credit/help'>
                    {C.txts.en.credit.gainMore}
                </StyledButton>
            </StyledComponents.Flex.Row>
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
