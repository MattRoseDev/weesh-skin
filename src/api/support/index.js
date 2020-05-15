import gql from 'graphql-tag'

const addMessage = gql`
    mutation addMessageToSupportForUser($subject: String, $description: String!) {
        addMessageToSupportForUser(subject: $subject, description: $description) {
            id
            subject
            description
            user {
                username
                firstName
                lastName
                bio
                private
                unknown {
                    avatar
                    fullname
                }
            }
            updatedAt
        }
    }
`

export default {
    addMessage,
}

