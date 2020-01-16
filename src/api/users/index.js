import gql from 'graphql-tag'

const getUserByUsername = gql`
    query getUserByUsername($username: String!){
        getUserByUsername(username: $username) {
            id
            username
            firstName
            lastName
            bio
            unknown {
                avatar
                fullname
            }
        }
    }
`

export default {
    getUserByUsername
}

