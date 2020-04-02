import gql from 'graphql-tag'

const add = gql`
    mutation addWeeshCommentForUser($weeshId: ID!, $content: String!, $parentId: ID){
        addWeeshCommentForUser(weeshId: $weeshId, content: $content, parentId: $parentId) {
            id
            user {
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
            content
            children {
                weeshComments {
                    user {
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
                    content
                    updatedAt
                }
                paginate {
                    totalDocs
                }
            }
            updatedAt
        }
    }
`

export default {
    add,
}

