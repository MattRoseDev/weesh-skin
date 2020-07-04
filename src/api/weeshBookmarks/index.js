import gql from 'graphql-tag'

const add = gql`
    mutation addWeeshToBookmarkForUsers($weeshId: ID!) {
        addWeeshToBookmarkForUsers(weeshId: $weeshId) {
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

const remove = gql`
    mutation removeWeeshFromBookmarkForUsers($weeshId: ID!) {
        removeWeeshFromBookmarkForUsers(weeshId: $weeshId) {
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

const getUserBookmarksWeeshes = gql`
    query getUserBookmarksWeeshesForUser($limit: Int, $page: Int) {
        getUserBookmarksWeeshesForUser(limit: $limit, page: $page) {
            weeshesBookmark {
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
                                avatarAddress
                                unknown {
                                    avatar
                                    fullname
                                }
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
                    isBookmarked {
                        user {
                            id
                            username
                        }
                    }
                    comment {
                        weeshComments {
                            user {
                                id
                                username
                                avatarAddress
                                unknown {
                                    avatar
                                    fullname
                                }
                            }
                            content
                            updatedAt
                        }
                        paginate {
                            totalDocs
                        }
                    }
                    commentsCounter
                    updatedAt
                }
            }
            paginate {
                totalDocs
            }
        }
    }
`

export default {
    add,
    remove,
    getUserBookmarksWeeshes,
}
