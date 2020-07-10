import gql from 'graphql-tag'

const exploreAll = gql`
    query exploreAllForUser($expression: String!, $limit: Int, $page: Int) {
        exploreAllForUser(expression: $expression, type: "SEARCH",limit: $limit, page: $page) {
            user {
                users {
                    id
                    username
                    firstName
                    lastName
                    avatarAddress
                    unknown {
                        fullname
                        avatar
                    }
                }
                paginate {
                    totalDocs
                }
            }
            tag {
                tags {
                    id
                    title
                    counter
                    updatedAt
                }
                paginate {
                    totalDocs
                }
            }
        }
    }
`

export default {
    exploreAll,
}
