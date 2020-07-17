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

const getLikes = gql`
    query getWeeshLikesByLinkForUser($link: String!) {
        getWeeshLikesByLinkForUser(link: $link) {
            weeshLikes {
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
                connection {
                    follower {
                        id
                        username
                        firstName
                        lastName
                        avatarAddress
                        unknown {
                            avatar
                            fullname
                        }
                    }
                    following {
                        id
                        username
                        firstName
                        lastName
                        avatarAddress
                        unknown {
                            avatar
                            fullname
                        }
                    }
                    status
                }
            }
            paginate {
                totalDocs
            }
        }
    }
`

export default {
    like,
    dislike,
    getLikes,
}
