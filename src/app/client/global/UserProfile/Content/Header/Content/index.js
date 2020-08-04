import React from 'react'
import styled from 'styled-components'
import Connection from 'Root/app/client/global/UserProfile/Content/Header/Content/Connection/index'
import StyledComponents, { Components } from 'Root/StyledComponents'
import Main from './Main'
import C from 'Root/constants'
import { UserContext } from 'Root/contexts/user'
import { AuthContext } from 'Root/contexts/auth'
import { useSubscription } from '@apollo/react-hooks'
import api from 'Root/api'
import diamond from 'Root/public/icons/diamond.svg'

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
    padding: ${window.innerWidth < 960 ? '0.75rem' : '0.75rem 0.75rem 1.5rem'};
`
const StyledCredit = styled(Components.Global.Link)`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    border: 1px solid ${({ theme }) => theme.colors.light};
    /* background: ${({ theme }) => theme.colors.lightPrimary}; */
    padding: .4rem .75rem;
    margin: 0 0.5rem 0 0;
    border-radius: 50rem;
`

const StyledCreditNumber = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    font-family: Autumn_in_November;
    margin: 0 0.25rem -0.3rem 0;
    font-size: 1rem;
    font-weight: bolder;
`

export default props => {
    const { user } = React.useContext(UserContext)
    const { auth } = React.useContext(AuthContext)

    return (
        <StyledContent>
            <StyledButtonContainer>
                <Components.Global.Button
                    color='primary'
                    hoverbackground='lightPrimary'
                    bordercolor='primary'
                    borderwidth='1px'
                    fontWeight='bold'
                    padding='.4rem .85rem'
                    margin='0 .5rem 0 0'
                    radius='50rem'
                    to='/credit'>
                    <StyledCreditNumber>6</StyledCreditNumber>
                    <img src={diamond} height='18' />
                </Components.Global.Button>
                {auth.id == user.id && (
                    <Components.Global.Button
                        color='primary'
                        hoverbackground='lightPrimary'
                        bordercolor='primary'
                        borderwidth='1px'
                        fontWeight='bold'
                        padding='.4rem'
                        margin='0 .5rem 0 0'
                        radius='50%'
                        to={`/${auth.username}/bookmarks`}>
                        <Components.Global.Icon
                            icon='Bookmark'
                            color={`${auth.color}`}
                        />
                    </Components.Global.Button>
                )}
                <Connection {...props} />
            </StyledButtonContainer>
            {user && <Main {...props} />}
        </StyledContent>
    )
}
