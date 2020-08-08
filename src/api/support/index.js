import gql from 'graphql-tag'

const addTicket = gql`
    mutation addUserTicketForUser($subject: String!, $message: String!) {
        addUserTicketForUser(subject: $subject, message: $message) {
            id
        }
    }
`

const addMessage = gql`
    mutation addUserTicketMessageForUser($ticketId: ID!, $message: String!) {
        addUserTicketMessageForUser(ticketId: $ticketId, message: $message) {
            id
        }
    }
`

const getTickets = gql`
    query getUserTicketsForUser($limit: Int, $page: Int) {
        getUserTicketsForUser(limit: $limit, page: $page) {
            tickets {
                id
                link
                subject
                message {
                    ticketMessages {
                        id
                        user {
                            id
                            username
                        }
                        message
                        read
                        createdAt
                    }
                }
                createdAt
            }
            paginate {
                totalDocs
                nextPage
            }
        }
    }
`

const getTicket = gql`
    query getTicketUserByLinkForUser($link: String!, $limit: Int, $page: Int) {
        getTicketUserByLinkForUser(link: $link, limit: $limit, page: $page) {
            id
            link
            subject
            message(limit: $limit, page: $page) {
                ticketMessages {
                    id
                    user {
                        id
                        username
                        firstName
                        lastName
                        bio
                        private
                        avatarAddress
                        unknown {
                            avatar
                            fullname
                        }
                    }
                    message
                    read
                    createdAt
                }
                paginate {
                    totalDocs
                    nextPage
                }
            }
            createdAt
        }
    }
`

export default {
    addTicket,
    addMessage,
    getTickets,
    getTicket,
}
