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

const join = gql`
    mutation join($email: String!, $password: String!, $firstName: String!){
        join(email: $email, password: $password, firstName: $firstName) {
            user {
                username
            }
            token
        }
    }
`

export default {
    login,
    join
}

