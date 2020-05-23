import React from 'react'
import styled from 'styled-components'
import uuid from 'uuid'
import Weesh from 'Root/components/global/Weesh'
import BannerMessage from 'Root/components/global/BannerMessage'
import InfiniteScroll from 'Root/components/global/InfiniteScroll'
import Loading from 'Root/components/global/Loading'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from 'Root/contexts/auth'
import api from 'Root/api'
import C from 'Root/constants'
import authError from 'Root/errors/auth'

const StyledContainer = styled.div`
    /* min-height: ${window.innerHeight - 55}px; */
`

const StyledLoadingContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentStart};
    padding: 3rem;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
`

export default () => {
    const limit = 10
    const { auth, dispatch } = React.useContext(AuthContext)
    const [state, setState] = React.useState(null)
    const [nextPage, setNextPage] = React.useState(1)

    const { data, called, error, loading, fetchMore } = useQuery(api.weeshes.getHomeWeeshes, {
        variables: {
            limit,
        },
        fetchPolicy: 'no-cache',
    })

    const fetchMoreWeeshes = async ({page}) => await fetchMore({
        variables: {
            limit,
            page
        },
        updateQuery: (prev, { fetchMoreResult, ...rest }) => {
            return fetchMoreResult
        }, 
    })

    const handlePaginate = () => fetchMoreWeeshes({ page: nextPage }).then(res => {
        const result = res.data.getHomeWeeshesForUser.weeshes
        setState(prevState => ([
            ...prevState,
            ...result
        ]))
        setNextPage(res.data.getHomeWeeshesForUser.paginate.nextPage)
    })

    React.useEffect(() => {
        if (error) {
            authError({ error }) && dispatch({ type: 'LOGOUT' })
            console.log(error)
        }
    },[error])

    React.useEffect(() => {
        if (called && data) {
            const result = data.getHomeWeeshesForUser.weeshes
            setState(result)
            setNextPage(data.getHomeWeeshesForUser.paginate.nextPage)
        }
    }, [data])

    return <StyledContainer>
        {loading ? <StyledLoadingContainer>
            <Loading size={28} strokeWidth={1.25} color='gray' />
        </StyledLoadingContainer> : state && state.length > 0 && <InfiniteScroll onLoadMore={handlePaginate} hasNextPage={nextPage} padding='.5rem .5rem 3.125rem'>
                {state.map(weesh => <Weesh {...weesh} key={uuid()} />)}
            </InfiniteScroll>}
        {!loading && state && !state.length && <StyledLoadingContainer>
            <BannerMessage padding='0 1rem' icon='Users' title={C.txts.en.g.welcome} message={C.txts.en.g.noFollowingYet} />
        </StyledLoadingContainer>}
    </StyledContainer>
}