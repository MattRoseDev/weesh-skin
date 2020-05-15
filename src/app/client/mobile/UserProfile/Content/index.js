import React from 'react'
import Header from './Header'
import UserNotFound from 'Root/components/global/NotFound/User'
import Loading from 'Root/components/global/Loading'
import Main from './Main'
import C from 'Root/constants'
import BannerMessage from 'Root/components/global/BannerMessage'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import styled from 'styled-components'
import authError from 'Root/errors/auth'

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledLoadingContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentStart};
    padding: .5rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
`

export default (props) => {
    const { match } = props
    const { auth, dispatch } = React.useContext(AuthContext)
    const { user, dispatch: userDispatch } = React.useContext(UserContext)
    const history = useHistory()

    // !auth.token && history.push('/')

    const { data, called, error, loading } = useQuery(api.users.getUserByUsernameForUser, {
        variables: {
            username: `${match.params.username}`
        },
        fetchPolicy: 'no-cache',
    })


    React.useEffect(() => {
        if(error) {
            authError({ error }) && dispatch({ type: 'LOGOUT' })
            console.log(error)
        }

        if (called && data) {
            const result = data.getUserByUsernameForUser
            console.log(result)
            userDispatch({
                type: 'ADD_USER_DATA',
                data: result
            })
        }
    }, [data, error])
    
    return <StyledContainer>
        {loading ? <Loading padding='2rem 0 0' size={28} strokeWidth={1.25} color='gray' /> : called && user && <>
            <Header {...props} />
            {
                user.private && user.connection.status < 2 && auth.id !== user.id ? <BannerMessage icon='Lock' title={C.txts.en.g.privateAccount} height={50} /> : user.weesh.weeshes.length > 0 ? <Main {...props} /> : <BannerMessage icon='PenTool' title={C.txts.en.g.noWeeshesYet} height={50} />
            }
        </>}
        {!loading && error && !user && <BannerMessage icon='User' title={C.txts.en.g.userNotFound} />}
    </StyledContainer>
}
