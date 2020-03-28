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
            }
        }
    }
`

export default {
    follow,
    unfollow,
    getFollowers,
    getFollowing,
}

