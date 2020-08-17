import React from 'react'
import styled from 'styled-components'
import Logo from 'Root/components/global/Logo'
import Header from 'Root/app/client/mobile/Template/Header'
import C from 'Root/constants'
import BackButton from 'Root/components/global/BackButton'
import FullName from 'Root/components/global/FullName'
import Icon from 'Root/components/global/Icon'
import { UserContext } from 'Root/contexts/user'

const StyledLogo = styled.div`
    ${C.styles.flex.flexRowCenter};
    width: 100%;
`

export default () => {
    const { user } = React.useContext(UserContext)

    return (
        <Header>
            {user && (
                <>
                    <BackButton icon='ArrowLeft' />
                    <FullName user={user} fontSize='1.125rem' labelSize={18} />
                    <Icon color='background' />
                </>
            )}
        </Header>
    )
}
