import gql from "graphql-tag";

const like = gql`
  mutation likeWeeshCommentForUser($commentId: ID!) {
    likeWeeshCommentForUser(commentId: $commentId) {
      id
      user {
        id
        username
        firstName
        lastName
        avatarAddress
      }
      comment {
        id
      }
      updatedAt
      createdAt
    }
  }
`;

const dislike = gql`
  mutation dislikeWeeshCommentForUser($commentId: ID!) {
    dislikeWeeshCommentForUser(commentId: $commentId) {
      id
      user {
        id
        username
        firstName
        lastName
        avatarAddress
      }
      comment {
        id
      }
      updatedAt
      createdAt
    }
  }
`;

const getLikes = gql`
  query getWeeshCommentLikesForUser($commentId: String!) {
    getWeeshCommentLikesForUser(commentId: $commentId) {
      paginate {
        totalDocs
      }
    }
  }
`;

export default {
  like,
  dislike,
  getLikes,
};
