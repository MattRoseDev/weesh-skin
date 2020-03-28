import gql from 'graphql-tag'

const getUserByUsernameForUser = gql`
    query getUserByUsernameForUser($username: String!){
        getUserByUsernameForUser(username: $username) {
            id
            username
            firstName
            lastName
            avatarAddress
            coverAddress
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
                    updatedAt
                }
                paginate {
                    totalDocs
                }
            }
        }
    }
`

const edit = gql`
    mutation editUserForUser(
        $firstName: String, 
        $lastName: String, 
        $bio: String,
        $private: Boolean,
        $unknown: Boolean
    ) {
        editUserForUser(user: {
            firstName: $firstName, 
            lastName: $lastName, 
            bio: $bio,
            private: $private,
            unknown: {
                avatar: $unknown,
                fullname: $unknown
            }
        }) {
            firstName
            lastName
            bio
            private
            unknown {
                avatar
                fullname
            }
        }
    }
`

const editUsername = gql`
    mutation editUsernameForUser($username: String!) {
        editUsernameForUser(username: $username) {
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
            token
        }
    }
`

const addOnlineUserForUser = gql`
    subscription addOnlineUserForUser {
        addOnlineUserForUser {
            username
        }
    }
`

export default {
    getUserByUsernameForUser,
    addOnlineUserForUser,
    editUsername,
    edit,
}

