import gql from "graphql-tag";

const add = gql`
  mutation addWeeshToBookmarkForUsers($weeshId: ID!) {
    addWeeshToBookmarkForUsers(weeshId: $weeshId) {
      id
      user {
        id
        username
        firstName
        lastName
        avatarAddress
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
      }
      updatedAt
    }
  }
`;

const remove = gql`
  mutation removeWeeshFromBookmarkForUsers($weeshId: ID!) {
    removeWeeshFromBookmarkForUsers(weeshId: $weeshId) {
      id
      user {
        id
        username
        firstName
        lastName
        avatarAddress
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
      }
      updatedAt
    }
  }
`;

const getUserBookmarksWeeshes = gql`
  query getUserBookmarksWeeshesForUser($limit: Int, $page: Int) {
    getUserBookmarksWeeshesForUser(limit: $limit, page: $page) {
      weeshesBookmark {
        weesh {
          id
          link
          user {
            id
            username
            firstName
            lastName
            avatarAddress
            label
            unknown {
              fullname
              avatar
            }
          }
          child {
            id
            link
            content
            status
            user {
              id
              username
              firstName
              lastName
              avatarAddress
              label
              unknown {
                fullname
                avatar
              }
            }
          }
          reweesh {
            paginate {
              totalDocs
            }
          }
          isReweeshed {
            id
            link
            user {
              id
              username
            }
            content
            child {
              id
              content
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
`;

export default {
  add,
  remove,
  getUserBookmarksWeeshes,
};
