import gql from "graphql-tag"

const getUserByInvitationCodeForUser = gql`
    query getUserByInvitationCodeForUser($invitationCode: String!) {
        getUserByInvitationCodeForUser(invitationCode: $invitationCode) {
            id
            username
            firstName
            lastName
            color
            theme
            email
            avatarAddress
            coverAddress
            bio
            private
            label
            unknown {
                avatar
                fullname
            }
            connection {
                follower {
                    id
                    username
                    unknown {
                        avatar
                        fullname
                    }
                }
                following {
                    id
                    username
                    unknown {
                        avatar
                        fullname
                    }
                }
                status
            }
            followers {
                paginate {
                    totalDocs
                }
            }
            following {
                paginate {
                    totalDocs
                }
            }
            weesh {
                weeshes {
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
                    isBookmarked {
                        user {
                            id
                            username
                        }
                    }
                    commentsCounter
                    updatedAt
                    createdAt
                }
                paginate {
                    totalDocs
                    nextPage
                }
            }
        }
    }
`

export default {
    getUserByInvitationCodeForUser,
}
