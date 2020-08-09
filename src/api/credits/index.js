import gql from 'graphql-tag'

const getTransactions = gql`
    query getCreditsTransactionsForUser($limit: Int, $page: Int) {
        getCreditsTransactionsForUser(limit: $limit, page: $page) {
            transactions {
                sender {
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
                recipient {
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
                reason
                amount
                createdAt
                updatedAt
            }
            paginate {
                totalDocs
                nextPage
            }
        }
    }
`

export default {
    getTransactions,
}
