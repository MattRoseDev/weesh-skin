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
import { TagContext } from 'Root/contexts/tag'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import styled from 'styled-components'
import authError from 'Root/errors/auth'
import { Helmet } from 'react-helmet'
import helpers from 'Root/helpers'

const StyledContainer = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    min-height: ${window.innerHeight - 55}px;
`

const StyledLoadingContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentStart};
    padding: 3rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    min-height: ${window.innerHeight - 55}px;
`

export default (props) => {
    const { match } = props
    const { auth, dispatch } = React.useContext(AuthContext)
    const { tag, dispatch: tagDispatch } = React.useContext(TagContext)
    const history = useHistory()

    // !auth.token && history.push('/')

    const { data, called, error, loading } = useQuery(api.tags.getWeeshesByTag,{
        variables: {
            tagTitle: `${match.params.tagTitle}`
        },
        fetchPolicy: 'no-cache',
    })


    React.useEffect(() => {
        console.log({ data, called, error, loading })
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
            authError({ error }) && dispatch({ type: 'LOGOUT' })
            console.log(error)
        }

        if (called && data) {
            const result = data.getWeeshesByTagForUser
            console.log(result)
            tagDispatch({
                type: 'ADD_TAG_DATA',
                data: result
            })
        }
    }, [data, error])
    
    return <StyledContainer>
        <Helmet>
            <title>{helpers.titleTag({ 
                type: 'Tags',
                data: {
                    tag: match.params.tagTitle
                }
            })}</title>
        </Helmet>
        {loading ? <Loading size={28} padding='3rem 0 0' strokeWidth={1.25} color='gray' /> : called && tag && <>
            {/* <Header {...props} /> */}
            <Main {...props} />
        </>}
        {!loading && (tag && !tag.weeshesTag) && <BannerMessage padding='3rem 0' icon='Hash' title={C.txts.en.g.noWeeshesYet} />}
    </StyledContainer>
}
