import gql from 'graphql-tag'

const exploreAll = gql`
    query exploreAllForUser($expression: String!){
        exploreAllForUser(expression: $expression) {
            user {
                users {
                    id
                    username
                    firstName
                    lastName
                    unknown {
                        fullname
                        avatar
                    }
                }
                paginate {
                    totalDocs
                }
            }
        }
    }
`

export default {
    exploreAll
}

