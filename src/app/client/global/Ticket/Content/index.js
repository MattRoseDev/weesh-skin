import React from "react"
import styled from "styled-components"
import C from "Root/constants"
import { useMutation, useQuery } from "@apollo/react-hooks"
import useHistory from "Root/hooks/useHistory"
import api from "Root/api"
import StyledComponent, { Components } from "Root/StyledComponents"
import { SnackBarContext } from "Root/contexts/snackbar"
import Message from "./Message"
import AddMessage from "./AddMessage"
import Meta from "Root/meta"
import { AuthContext } from "Root/contexts/auth"

const StyledContainer = styled.div``

const StyledHeader = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    ${C.styles.flex.justifyContentBetween};
    padding: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.foreground};
`

const StyledTitle = styled.div`
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: text;
    width: 75%;
`

const StyledAdd = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    cursor: pointer;
`

const StyledAddTitle = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    padding: 0 0 0 0.25rem;
`

export default props => {
    const { match } = props
    const { auth, dispatch: authDispatch } = React.useContext(AuthContext)
    const [nextPage, setNextPage] = React.useState(1)
    const [showAddMessage, setShowAddMessage] = React.useState(false)
    const [state, setState] = React.useState(null)
    const [ticket, setTicket] = React.useState(null)
    const [readMessages, readMessageResponse] = useMutation(
        api.support.readMessages,
    )
    const { data, error, loading, called, fetchMore } = useQuery(
        api.support.getTicket,
        {
            fetchPolicy: "no-cache",
            variables: {
                link: `${match.params.link}`,
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
            const response =
                res.data.getUserTicketByLinkForUser.message.ticketMessages
            setState(prevState => [...prevState, ...response])
            setNextPage(
                res.data.getUserTicketByLinkForUser.message.paginate.nextPage,
            )
        })

    React.useEffect(() => {
        if (!state && called && data && nextPage == 1) {
            const response =
                data.getUserTicketByLinkForUser.message.ticketMessages
            const ticketResponse = data.getUserTicketByLinkForUser
            if (
                response &&
                response[0].recipient.id == auth.id &&
                response[0].read == false
            ) {
                readMessages({
                    variables: {
                        ticketId: `${ticketResponse.id}`,
                    },
                })
            }
            setTicket(ticketResponse)
            setState(response)
            setNextPage(
                data.getUserTicketByLinkForUser.message.paginate.nextPage,
            )
        }
    }, [data])

    React.useEffect(() => {
        if (readMessageResponse.data) {
            authDispatch({
                type: "LOGIN",
                data: {
                    isNewTicketMessage:
                        readMessageResponse.data.readUserTicketMessageForUser,
                },
            })
        }
    }, [readMessageResponse.data])

    return (
        <StyledContainer>
            <Meta type="Support" />
            {loading ? (
                <Components.Global.Loading
                    padding="3rem 0 0"
                    size={28}
                    strokeWidth={1.25}
                    color="gray"
                />
            ) : (
                state && (
                    <>
                        <StyledHeader>
                            <StyledTitle>
                                {ticket && ticket.subject}
                            </StyledTitle>
                            <StyledAdd
                                onClick={() =>
                                    setShowAddMessage(!showAddMessage)
                                }>
                                <Components.Global.Icon
                                    icon="Edit"
                                    color={auth.color}
                                />
                                <StyledAddTitle>Message</StyledAddTitle>
                            </StyledAdd>
                        </StyledHeader>
                        {showAddMessage && (
                            <AddMessage
                                setShowAddMessage={setShowAddMessage}
                                setMessages={setState}
                                {...ticket}
                            />
                        )}
                        {state && state.length > 0 && (
                            <Components.Global.InfiniteScroll
                                onLoadMore={handlePaginate}
                                hasNextPage={nextPage}
                                padding="0 0 3.125rem"
                                alignItems="stretch">
                                {state.map(message => (
                                    <Message {...message} />
                                ))}
                            </Components.Global.InfiniteScroll>
                        )}
                    </>
                )
            )}
        </StyledContainer>
    )
}
