import gql from 'graphql-tag'

const getUserByUsernameForUser = gql`
    query getUserByUsernameForUser($username: String!){
        getUserByUsernameForUser(username: $username) {
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
                paginate {
                    totalDocs
                    nextPage
                }
            }
        }
    }
`

const edit = gql`
    mutation editUserForUser(
        $username: String, 
        $email: String, 
        $firstName: String, 
        $lastName: String, 
        $color: String, 
        $theme: String, 
        $bio: String,
        $private: Boolean,
        $unknown: Boolean
    ) {
        editUserForUser(user: {
            username: $username, 
            email: $email, 
            firstName: $firstName, 
            lastName: $lastName, 
            color: $color, 
            theme: $theme, 
            bio: $bio,
            private: $private,
            unknown: {
                avatar: $unknown,
                fullname: $unknown
            }
        }) {
            user {
                username
                email
                firstName
                lastName
                color
                theme
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

const changePassword = gql`
    mutation changePasswordForUser($oldPassword: String!, $newPassword: String!) {
        changePasswordForUser(oldPassword: $oldPassword, newPassword: $newPassword) {
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
    }
`

const checkUsername = gql`
    query checkUsernameForUser($username: String!) {
        checkUsernameForUser(username: $username) {
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
    }
`

const checkEmail = gql`
    query checkEmailForUser($email: String!) {
        checkEmailForUser(email: $email) {
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
    checkUsername,
    changePassword,
    checkEmail,
    editUsername,
    edit,
}

