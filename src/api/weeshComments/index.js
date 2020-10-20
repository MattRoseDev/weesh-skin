import gql from "graphql-tag";

const add = gql`
  mutation addWeeshCommentForUser(
    $weeshId: ID!
    $content: String!
    $parentId: ID
  ) {
    addWeeshCommentForUser(
      weeshId: $weeshId
      content: $content
      parentId: $parentId
    ) {
      id
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
      like {
        weeshCommentLikes {
          id
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
        id
        user {
          id
          username
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
            label
            unknown {
              fullname
              avatar
            }
          }
          like {
            weeshCommentLikes {
              id
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
            id
            user {
              id
              username
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
  }
`;

const remove = gql`
  mutation removeWeeshCommentForUser($commentId: ID!) {
    removeWeeshCommentForUser(commentId: $commentId) {
      id
    }
  }
`;

export default {
  add,
  remove,
};
