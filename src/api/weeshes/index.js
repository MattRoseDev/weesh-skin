import gql from 'graphql-tag'

const add = gql`
    mutation addWeeshForUser($content: String!, $status: Int){
        addWeeshForUser(content: $content,status: $status) {
            id
            user {
                id
                username
                firstName
                lastName
                avatarAddress
            }
            content 
            status
            updatedAt
        }
    }
`

const deleteWeesh = gql`
    mutation deleteWeeshForUser($weeshId: ID!){
        deleteWeeshForUser(weeshId: $weeshId) {
            id
        }
    }
`

const getHomeWeeshes = gql`
    query getHomeWeeshesForUser($limit: Int, $page: Int){
        getHomeWeeshesForUser(limit: $limit, page: $page) {
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
                    paginate {
                        totalDocs
                    }
                }
                commentsCounter
                updatedAt
            }
            paginate {
                totalDocs
                nextPage
            }
        }
    }
`

const getShowcase = gql`
    query getTheBestWeeshesForUser($limit: Int, $page: Int){
        getTheBestWeeshesForUser(limit: $limit, page: $page) {
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
                commentsCounter
                updatedAt
            }
            paginate {
                totalDocs
            }
        }
    }
`

const getWeeshes = gql`
    query getWeeshesForUser($userId: ID!, $limit: Int, $page: Int){
        getWeeshesForUser(userId: $userId, limit: $limit, page: $page) {
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
                commentsCounter
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
                isBookmarked {
                    user {
                        id
                        username
                    }
                }
                updatedAt
            }
            paginate {
                totalDocs
            }
        }
    }
`

const getWeeshByLink = gql`
    query getWeeshByLinkForUser($link: String!){
        getWeeshByLinkForUser(link: $link) {
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
            isBookmarked {
                user {
                    id
                    username
                }
            }
            comment {
                weeshComments {
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
                paginate {
                    totalDocs
                }
            }
            # commentsCounter
            # updatedAt
        }
    }
`


export default {
    add,
    deleteWeesh,
    getWeeshes,
    getHomeWeeshes,
    getShowcase,
    getWeeshByLink,
}

