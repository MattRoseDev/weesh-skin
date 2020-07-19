import gql from 'graphql-tag'

const login = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                id
                firstName
                lastName
                color
                theme
                bio
                username
                email
                private
                avatarAddress
                unknown {
                    fullname
                    avatar
                }
            }
            token
        }
    }
`

const join = gql`
    mutation join($email: String!, $password: String!, $firstName: String!) {
        join(email: $email, password: $password, firstName: $firstName) {
            user {
                id
                firstName
                lastName
                color
                theme
                bio
                username
                email
                private
                avatarAddress
                unknown {
                    fullname
                    avatar
                }
            }
            token
        }
    }
`

const oAuthGoogle = gql`
    mutation oAuthGoogle($gToken: String!) {
        oAuthGoogle(gToken: $gToken) {
            user {
                id
                firstName
                lastName
                color
                theme
                bio
                username
                email
                private
                avatarAddress
                unknown {
                    fullname
                    avatar
                }
            }
            token
        }
    }
`

const getUserProfile = gql`
    query getUserProfileForUse {
        getUserProfileForUser {
            id
            firstName
            lastName
            color
            theme
            bio
            username
            email
            private
            avatarAddress
            coverAddress
            unknown {
                fullname
                avatar
            }
        }
    }
`

export default {
    login,
    join,
    oAuthGoogle,
    getUserProfile,
}
