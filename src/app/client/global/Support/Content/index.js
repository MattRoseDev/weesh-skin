import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import { useMutation, useQuery } from '@apollo/react-hooks'
import useHistory from 'Root/hooks/useHistory'
import api from 'Root/api'
import { AuthContext } from 'Root/contexts/auth'
import { SnackBarContext } from 'Root/contexts/snackbar'
import StyledComponent, { Components } from 'Root/StyledComponents'
import Ticket from './Ticket'
import AddTicket from './AddTicket'
import Meta from 'Root/meta'

const StyledContainer = styled.div``

const StyledHeader = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    cursor: pointer;
`

const StyledTitle = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 0 0 0 0.25rem;
`

const StyledAdd = styled(Components.Global.Link)``

export default props => {
    const { auth } = React.useContext(AuthContext)
    const [state, setState] = React.useState(null)
    const [nextPage, setNextPage] = React.useState(1)
    const [showAddTicket, setShowAddTicket] = React.useState(false)
    const { data, error, loading, called, fetchMore } = useQuery(
        api.support.getTickets,
        {
            fetchPolicy: 'no-cache',
            variables: {
                limit: 8,
            },
        },
    )
    const history = useHistory()

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
            const result = res.data.getUserTicketsForUser.tickets
            setState(prevState => [...prevState, ...result])
            setNextPage(res.data.getUserTicketsForUser.paginate.nextPage)
        })

    React.useEffect(() => {
        if (called && data) {
            const result = data.getUserTicketsForUser.tickets
            setState(result)
            setNextPage(data.getUserTicketsForUser.paginate.nextPage)
        }
    }, [data])

    return (
        <StyledContainer>
            <Meta type='Support' />
            {loading ? (
                <Components.Global.Loading
                    padding='3rem 0 0'
                    size={28}
                    strokeWidth={1.25}
                    color='gray'
                />
            ) : (
                <>
                    {auth.username !== 'team' && (
                        <StyledHeader
                            onClick={() => setShowAddTicket(!showAddTicket)}>
                            <Components.Global.Icon
                                icon='PlusSquare'
                                color={auth.color}
                            />
                            <StyledTitle>New ticket</StyledTitle>
                        </StyledHeader>
                    )}
                    {showAddTicket && (
                        <AddTicket
                            setShowAddTicket={setShowAddTicket}
                            setTickets={setState}
                        />
                    )}
                    {state && state.length > 0 && (
                        <Components.Global.InfiniteScroll
                            onLoadMore={handlePaginate}
                            hasNextPage={nextPage}
                            padding='0 .6rem 3.125rem'>
                            {state.map(ticket => (
                                <Ticket {...ticket} />
                            ))}
                        </Components.Global.InfiniteScroll>
                    )}
                </>
            )}
        </StyledContainer>
    )
}
