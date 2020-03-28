import gql from 'graphql-tag'

const add = gql`
    subscription addNotificationForUser($userId: ID!){
        addNotificationForUser(userId: $userId) {
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
            recipient {
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
            read
            url
            status
            notificationType {
                template
                type
            }
            updatedAt
            createdAt
        }
    }
`

const getNotifications = gql`
    query getNotificationsUserForUser($limit: Int, $page: Int){
        getNotificationsUserForUser(limit: $limit, page: $page) {
            notifications {
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
                recipient {
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
                read
                url
                status
                notificationType {
                    template
                    type
                }
                updatedAt
                createdAt
            }
            paginate {
                totalDocs
            }
        }
    }
`

const read = gql`
    mutation readNotificationsUserForUser {
        readNotificationsUserForUser {
            notifications {
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
                recipient {
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
                read
                url
                status
                notificationType {
                    template
                    type
                }
                updatedAt
                createdAt
            }
            paginate {
                totalDocs
            }
        }
    }
`


export default {
    add,
    read,
    getNotifications,
}

