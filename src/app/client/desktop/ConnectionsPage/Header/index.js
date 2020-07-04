import React from 'react'
import styled from 'styled-components'
import BackButton from 'Root/components/global/BackButton'
import Avatar from 'Root/components/global/Avatar'
import Icon from 'Root/components/global/Icon'
import Navbar from 'Root/components/mobile/Navbar'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import avatar from 'Root/public/img/avatar.jpg'
import C from 'Root/constants'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentBetween};
    ${C.styles.flex.alignItemsCenter};
    background: ${({ theme }) => theme.colors.background};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    padding: 0 1rem;
    height: 54px;
    position: sticky;
    top: 0;
    z-index: 10;
`

const StyledTitle = styled.strong`
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.foreground};
    font-size: 1.25rem;
`

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)
    let url = props.match.url.split('/')
    const status = url[url.length - 1]

    return (
        <>
            {auth.token ? (
                <StyledContainer>
                    <BackButton color='foreground' icon='ArrowLeft' />
                    <StyledTitle>{status}</StyledTitle>
                    <Icon color='background' />
                </StyledContainer>
            ) : (
                <></>
            )}
        </>
    )
}
