import gql from 'graphql-tag'

const like = gql`
    mutation likeWeeshForUser($weeshId: ID!) {
        likeWeeshForUser(weeshId: $weeshId) {
            id
            user {
                id
                username
                firstName
                lastName
                avatarAddress
            }
            weesh {
                id
                link
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
                status
                like {
                    weeshLikes {
                        user {
                            id
                            username
                        }
                    }
                    paginate {
                        totalDocs
                    }
                }
                isLiked {
                    user {
                        id
                        username
                    }
                }
            }
            updatedAt
        }
    }
`

const dislike = gql`
    mutation dislikeWeeshForUser($weeshId: ID!) {
        dislikeWeeshForUser(weeshId: $weeshId) {
            id
            user {
                id
                username
                firstName
                lastName
                avatarAddress
            }
            weesh {
                id
                link
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
                status
                like {
                    weeshLikes {
                        user {
                            id
                            username
                        }
                    }
                    paginate {
                        totalDocs
                    }
                }
                isLiked {
                    user {
                        id
                        username
                    }
                }
            }
            updatedAt
        }
    }
`

export default {
    like,
    dislike,
}
