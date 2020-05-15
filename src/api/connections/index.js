import gql from 'graphql-tag'

const follow = gql`
    mutation followUserConnectionForUser($userId: ID!){
        followUserConnectionForUser(userId: $userId) {
            follower {
                id
            }
            following {
                id
            }
            status
        }
    }
`

const unfollow = gql`
    mutation unfollowUserConnectionForUser($userId: ID!){
        unfollowUserConnectionForUser(userId: $userId) {
            follower {
                id
            }
            following {
                id
            }
            status
        }
    }
`

const accept = gql`
    mutation acceptUserConnectionForUser($userId: ID!){
        acceptUserConnectionForUser(userId: $userId) {
            follower {
                id
            }
            following {
                id
            }
            status
        }
    }
`

const reject = gql`
    mutation rejectUserConnectionForUser($userId: ID!){
        rejectUserConnectionForUser(userId: $userId) {
            follower {
                id
            }
            following {
                id
            }
            status
        }
    }
`

const getFollowers = gql`
    query getFollowersUserConnectionByUsernameForUser($username: String!){
        getFollowersUserConnectionByUsernameForUser(username: $username) {
            userConnections {
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
        }
    }
`

const getFollowing = gql`
    query getFollowingUserConnectionByUsernameForUser($username: String!){
        getFollowingUserConnectionByUsernameForUser(username: $username) {
            userConnections {
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
        }
    }
`

const getRequests = gql`
    query getRequestsUsersConnectionByIdForUser{
        getRequestsUsersConnectionByIdForUser {
            userConnections {
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
            }
        }
    }
`

export default {
    follow,
    unfollow,
    accept,
    reject,
    getFollowers,
    getFollowing,
    getRequests,
}

