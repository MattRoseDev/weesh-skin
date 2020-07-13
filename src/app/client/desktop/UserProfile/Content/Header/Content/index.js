import React from 'react'
import styled from 'styled-components'
import Connection from 'Root/app/client/global/UserProfile/Content/Header/Content/Connection/index'
import Icon from 'Root/components/global/Icon'
import Button from 'Root/components/global/Button'
import Main from './Main'
import C from 'Root/constants'
import { UserContext } from 'Root/contexts/user'
import { AuthContext } from 'Root/contexts/auth'
import { useSubscription } from '@apollo/react-hooks'
import api from 'Root/api'
import { Link } from 'react-router-dom'

const StyledContent = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsEnd};
    /* box-shadow: 1px 1px 3px 1px ${({ theme }) => theme.colors.light}; */
    padding: 0 0 .5rem;
    border-radius: 0 0 .75rem .75rem;
`

const StyledButtonContainer = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 0.75rem 0.75rem 1.5rem;
`

const StyledBookmarkButton = styled(Link)`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    background: ${({ theme }) => theme.colors.foreground};
    padding: 0.4rem;
    margin: 0 0.5rem 0 0;
    border-radius: 50%;
`

export default props => {
    const { user } = React.useContext(UserContext)
    const { auth } = React.useContext(AuthContext)

    return (
        <StyledContent>
            <StyledButtonContainer>
                {auth.id == user.id && (
                    <Button
                        color='primary'
                        hoverbackground='lightPrimary'
                        bordercolor='primary'
                        borderwidth='1px'
                        fontWeight='bold'
                        padding='.4rem'
                        margin='0 .5rem 0 0'
                        radius='50%'
                        to={`/${auth.username}/bookmarks`}>
                        <Icon icon='Bookmark' color={`${auth.color}`} />
                    </Button>
                )}
                <Connection {...props} />
            </StyledButtonContainer>
            {user && <Main {...props} />}
        </StyledContent>
    )
}
