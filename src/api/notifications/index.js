import gql from 'graphql-tag'

const add = gql`
    subscription addNotificationForUser($recipientId: ID!) {
        addNotificationForUser(recipientId: $recipientId) {
            id
            sender {
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
            }
            comment {
                id
                content
            }
            updatedAt
            createdAt
        }
    }
`

const getNotifications = gql`
    query getNotificationsUserForUser($limit: Int, $page: Int) {
        getNotificationsUserForUser(limit: $limit, page: $page) {
            notifications {
                id
                sender {
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
                }
                comment {
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
                sender {
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
