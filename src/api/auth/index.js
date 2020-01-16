import gql from 'graphql-tag'

const login = gql`
    query login($username: String!,$password: String!){
        login(username: $username,password: $password) {
            user {
                username
            }
            token
        }
    }
`

export default {
    login
}

