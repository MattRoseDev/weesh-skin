import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import api from 'Root/api'
import Weesh from 'Root/components/global/Weesh'
import Loading from 'Root/components/global/Loading'
import InfiniteScroll from 'Root/components/global/InfiniteScroll'
import styled from 'styled-components'
import C from 'Root/constants'
import uuid from 'uuid'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.justifyContentCenter};
    padding: 0.5rem 0 0;
`

export default () => {
    const [state, setState] = React.useState(null)
    const [nextPage, setNextPage] = React.useState(1)
    const { data, called, error, loading, fetchMore } = useQuery(
        api.weeshes.getShowcase,
        {
            fetchPolicy: 'no-cache',
            variables: {
                limit: 5,
            },
        },
    )

    const fetchMoreWeeshes = async ({ page }) =>
        await fetchMore({
            variables: {
                page,
            },
            updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                return fetchMoreResult
            },
        })

    const handlePaginate = () =>
        fetchMoreWeeshes({ page: nextPage }).then(res => {
            const result = res.data.getTheBestWeeshesForUser.weeshes
            setState(prevState => [...prevState, ...result])
            setNextPage(res.data.getTheBestWeeshesForUser.paginate.nextPage)
        })

    React.useEffect(() => {
        if (called && data) {
            const result = data.getTheBestWeeshesForUser.weeshes
            setState(result)
            setNextPage(data.getTheBestWeeshesForUser.paginate.nextPage)
        }
    }, [data])

    return (
        <StyledContainer>
            {loading ? (
                <Loading
                    padding='3rem 0 0'
                    size={28}
                    strokeWidth={1.25}
                    color='gray'
                />
            ) : (
                state &&
                state.length > 0 && (
                    <InfiniteScroll
                        onLoadMore={handlePaginate}
                        hasNextPage={nextPage}
                        padding='0 .5rem 3.125rem'>
                        {state.map(weesh => (
                            <Weesh {...weesh} key={uuid()} />
                        ))}
                    </InfiniteScroll>
                )
            )}
        </StyledContainer>
    )
}
