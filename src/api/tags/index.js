import gql from 'graphql-tag'

const suggestion = gql`
    query exploreAllForUser($expression: String!, $limit: Int, $page: Int) {
        exploreAllForUser(expression: $expression, type: "SUGGESTION",limit: $limit, page: $page) {
            tag {
                tags {
                    id
                    title
                    counter
                    updatedAt
                }
                paginate {
                    totalDocs
                }
            }
        }
    }
`

const getTheBestTags = gql`
    query getTheBestTagsForUser($limit: Int, $page: Int) {
        getTheBestTagsForUser(limit: $limit, page: $page) {
            tags {
                id
                title
                weeshCounter
                updatedAt
            }
            paginate {
                totalDocs
            }
        }
    }
`

const getWeeshesByTag = gql`
    query getWeeshesByTagForUser($tagTitle: String!, $limit: Int, $page: Int) {
        getWeeshesByTagForUser(
            tagTitle: $tagTitle
            limit: $limit
            page: $page
        ) {
            weeshesTag {
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
    getTheBestTags,
    getWeeshesByTag,
    suggestion,
}
