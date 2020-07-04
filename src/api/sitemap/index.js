import gql from 'graphql-tag'

const getUsersSitemapForUser = gql`
    query getUsersSitemapForUser($limit: Int, $page: Int) {
        getUsersSitemapForUser(limit: $limit, page: $page) {
            users {
                username
            }
        }
    }
`

export default {
    getUsersSitemapForUser,
}
