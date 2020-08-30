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
import Catalog from './Catalog'
import StyledComponents, { Components } from 'Root/StyledComponents'

const StyledContainer = styled.div`
    min-height: ${window.innerHeight - 55}px;
    padding: 0 0 3.5rem;
`
const StyledTitle = styled.h2`
    margin: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
`

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const history = useHistory()

    return auth.id ? (
        <StyledContainer>
            <Meta type='Credit' />
            <StyledComponents.Flex.Column>
                <StyledComponents.Title
                    margin='1rem'
                    fontWeight='bold'
                    fontSize='1.5rem'>
                    What is <Components.Global.Diamond /> ?
                </StyledComponents.Title>
                <StyledComponents.Description
                    margin='0 1rem 1.5rem'
                    fontSize='.9rem'>
                    {C.txts.en.credit.description}
                </StyledComponents.Description>
            </StyledComponents.Flex.Column>
            <StyledComponents.Flex.Column>
                <StyledComponents.Title
                    margin='1rem'
                    fontWeight='bold'
                    fontSize='1.5rem'>
                    How to Gain?
                </StyledComponents.Title>
                <Catalog auth={auth} />
            </StyledComponents.Flex.Column>
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
