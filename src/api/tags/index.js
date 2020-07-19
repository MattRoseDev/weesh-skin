import gql from 'graphql-tag'

const suggestion = gql`
    query exploreAllForUser($expression: String!, $limit: Int, $page: Int) {
        exploreAllForUser(
            expression: $expression
            type: "SUGGESTION"
            limit: $limit
            page: $page
        ) {
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
