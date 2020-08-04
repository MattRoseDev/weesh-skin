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
                password
                email
                private
                avatarAddress
                invitationCode
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
    mutation join(
        $email: String!
        $password: String!
        $firstName: String!
        $invitationCode: String
    ) {
        join(
            email: $email
            password: $password
            firstName: $firstName
            invitationCode: $invitationCode
        ) {
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
                invitationCode
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
    mutation oAuthGoogle($gToken: String!, $invitationCode: String) {
        oAuthGoogle(gToken: $gToken, invitationCode: $invitationCode) {
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
                invitationCode
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
            password
            email
            private
            avatarAddress
            coverAddress
            invitationCode
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
