import gql from 'graphql-tag'

const getUserByUsernameForUser = gql`
    query getUserByUsernameForUser($username: String!){
        getUserByUsernameForUser(username: $username) {
            id
            username
            firstName
            lastName
            bio
            private
            unknown {
                avatar
                fullname
            }
            connection {
                follower {
                    id
                    username
                }
                following {
                    id
                    username
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
                    comment {
                        weeshComments {
                            user {
                                id
                                username
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
        }
    }
`

export default {
    getUserByUsernameForUser
}

