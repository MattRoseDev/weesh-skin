import gql from "graphql-tag";

const addTicket = gql`
  mutation addUserTicketForUser($subject: String!, $message: String!) {
    addUserTicketForUser(subject: $subject, message: $message) {
      id
      link
      subject
      sender {
        id
        username
        firstName
        lastName
        bio
        private
        avatarAddress
        label
        unknown {
          avatar
          fullname
        }
      }
      recipient {
        id
        username
        firstName
        lastName
        bio
        private
        avatarAddress
        label
        unknown {
          avatar
          fullname
        }
      }
      message {
        ticketMessages {
          id
          recipient {
            id
            username
          }
          message
          read
          createdAt
        }
      }
      createdAt
    }
  }
`;

const addMessage = gql`
  mutation addUserTicketMessageForUser(
    $ticketId: ID!
    $recipientId: ID!
    $message: String!
  ) {
    addUserTicketMessageForUser(
      ticketId: $ticketId
      recipientId: $recipientId
      message: $message
    ) {
      id
      sender {
        id
        username
        firstName
        lastName
        bio
        private
        avatarAddress
        label
        unknown {
          avatar
          fullname
        }
      }
      message
      read
      createdAt
    }
  }
`;

const getTickets = gql`
  query getUserTicketsForUser($limit: Int, $page: Int) {
    getUserTicketsForUser(limit: $limit, page: $page) {
      tickets {
        id
        link
        subject
        sender {
          id
          username
          firstName
          lastName
          bio
          private
          avatarAddress
          label
          unknown {
            avatar
            fullname
          }
        }
        recipient {
          id
          username
          firstName
          lastName
          bio
          private
          avatarAddress
          label
          unknown {
            avatar
            fullname
          }
        }
        message {
          ticketMessages {
            id
            recipient {
              id
              username
            }
            message
            read
            createdAt
          }
        }
        createdAt
      }
      paginate {
        totalDocs
        nextPage
      }
    }
  }
`;

const getTicket = gql`
  query getUserTicketByLinkForUser($link: String!, $limit: Int, $page: Int) {
    getUserTicketByLinkForUser(link: $link, limit: $limit, page: $page) {
      id
      link
      subject
      sender {
        id
        username
      }
      recipient {
        id
        username
      }
      message(limit: $limit, page: $page) {
        ticketMessages {
          id
          sender {
            id
            username
            firstName
            lastName
            bio
            private
            avatarAddress
            label
            unknown {
              avatar
              fullname
            }
          }
          recipient {
            id
            username
          }
          message
          read
          createdAt
        }
        paginate {
          totalDocs
          nextPage
        }
      }
      createdAt
    }
  }
`;

const readMessages = gql`
  mutation readUserTicketMessageForUser($ticketId: ID!) {
    readUserTicketMessageForUser(ticketId: $ticketId)
  }
`;

export default {
  addTicket,
  addMessage,
  getTickets,
  getTicket,
  readMessages,
};
