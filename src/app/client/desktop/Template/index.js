import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import Footer from './Footer'
import SnackBar from 'Root/components/desktop/SnackBar'
import Alert from 'Root/components/desktop/Alert'
import Container from 'Root/components/desktop/Container'
import styled from 'styled-components'
import C from 'Root/constants'
import useHistory from 'Root/hooks/useHistory'
import {AuthContext} from 'Root/contexts/auth'

const StyledContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentCenter};
    position: relative;
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.foreground};
`

export default props => {
    const {auth} = React.useContext(AuthContext)
    const history = useHistory()

    const limitedRoutes = ['/', '/join', '/login']

    return (
        <Container width='80rem' margin='0 auto'>
            <StyledContainer>
                <Alert />
                <SnackBar />
                {limitedRoutes.includes(history.location.pathname) &&
                !auth.token ? (
                    ''
                ) : (
                    <Sidebar />
                )}
                <Main>{props.children}</Main>
            </StyledContainer>
        </Container>
    )
}
