import React from 'react'
import Header from './Header'
import UserNotFound from 'Root/components/global/NotFound/User'
import Loading from 'Root/components/global/Loading'
import Container from 'Root/components/desktop/Container'
import Main from './Main'
import C from 'Root/constants'
import BannerMessage from 'Root/components/global/BannerMessage'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import { UserContext } from 'Root/contexts/user'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import styled from 'styled-components'
import authError from 'Root/errors/auth'

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    min-height: ${window.innerHeight - 55}px;
`

export default (props) => {
    const { match } = props
    const { auth, dispatch } = React.useContext(AuthContext)
    const { user, dispatch: userDispatch } = React.useContext(UserContext)
    const history = useHistory()

    const { data, called, error, loading } = useQuery(api.users.getUserByUsernameForUser,{
        variables: {
            username: `${match.params.username}`
        },
        fetchPolicy: 'no-cache',
    })


    React.useEffect(() => {
        if(!data) {
            // fetchMore({
            //     variables: {
            //         username: `${match.params.username}`
            //     },
            //     updateQuery: (prev, { fetchMoreResult, ...rest }) => {
            //         return fetchMoreResult
            //     }, 
            // })
        }
        // if(!data) {
        //     fetchMore({
        //         variables: {
        //             username: `${match.params.username}`
        //         },
        //         updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        //             return fetchMoreResult
        //         },
        //     })
        // }   
        
        if(error) {
            // authError({ error }) && dispatch({ type: 'LOGOUT' })
            console.log(error)
        }

        if (called && data) {
            const response = data.getUserByUsernameForUser
            console.log(response)
            userDispatch({
                type: 'ADD_USER_DATA',
                data: response
            })
        }
    }, [data, error])
    
    return <StyledContainer>
        {loading ? <Loading padding='3rem 0 0' size={28} strokeWidth={1.25} color='gray' /> : called && user && <>
            <Header {...props} />
            {
                user.private && user.connection.status < 2 && auth.id !== user.id ? <BannerMessage icon='Lock' title={C.txts.en.g.privateAccount} height={50} /> : user.weesh.weeshes.length > 0 ? <Main {...props} /> : <BannerMessage icon='PenTool' title={C.txts.en.g.noWeeshesYet} height={50} />
            }
        </>}
        {!loading && error && !user && <BannerMessage padding='3rem 0 0' icon='User' title={C.txts.en.g.userNotFound} />}
    </StyledContainer>
}
