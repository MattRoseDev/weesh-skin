import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import BackButton from 'Root/components/global/BackButton'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'
import Header from 'Root/app/client/mobile/Template/Header'
import { AuthContext } from 'Root/contexts/auth'

const StyledTitle = styled.strong`
    color: ${({ theme }) => theme.colors.foreground};
    text-transform: capitalize;
`

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const { changePassword } = C.txts.en.editProfile
    return (
        <Header>
            <BackButton />
            {auth.password != undefined && (
                <StyledTitle>
                    {`${
                        auth.password
                            ? `${changePassword.change}`
                            : `${changePassword.set}`
                    }`}{' '}
                    {changePassword.password}
                </StyledTitle>
            )}
            <Icon size={24} color='background' icon='ChevronLeft' />
        </Header>
    )
}
