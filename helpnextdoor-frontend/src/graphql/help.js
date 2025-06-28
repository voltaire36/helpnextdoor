import { gql } from "@apollo/client";

export const GET_PAGINATED_HELP_REQUESTS = gql`
  query GetPaginatedHelpRequests($limit: Int!, $offset: Int!) {
    getPaginatedHelpRequests(limit: $limit, offset: $offset) {
      id
      description
      location
      isResolved
      author {
        username
      }
      createdAt
      volunteers
    }
  }
`;

export const GET_HELP_REQUESTS_BY_USER = gql`
  query GetHelpRequestsByUser($userId: ID!) {
    getHelpRequestsByUser(userId: $userId) {
      id
      description
      location
      isResolved
      createdAt
      volunteers
    }
  }
`;

export const CREATE_HELP_REQUEST = gql`
  mutation CreateHelpRequest(
    $author: ID!
    $description: String!
    $location: String!
  ) {
    createHelpRequest(
      author: $author
      description: $description
      location: $location
    ) {
      id
      description
      location
      isResolved
      createdAt
    }
  }
`;

export const UPDATE_HELP_REQUEST = gql`
  mutation UpdateHelpRequest(
    $id: ID!
    $description: String!
    $location: String!
  ) {
    updateHelpRequest(id: $id, description: $description, location: $location) {
      id
      description
      location
      updatedAt
    }
  }
`;

export const DELETE_HELP_REQUEST = gql`
  mutation DeleteHelpRequest($id: ID!) {
    deleteHelpRequest(id: $id)
  }
`;

export const VOLUNTEER_FOR_HELP = gql`
  mutation VolunteerForHelp($id: ID!, $userId: ID!) {
    volunteerForHelp(id: $id, userId: $userId) {
      id
      volunteers
      updatedAt
    }
  }
`;

export const RESOLVE_HELP_REQUEST = gql`
  mutation ResolveHelpRequest($id: ID!) {
    resolveHelpRequest(id: $id) {
      id
      isResolved
      updatedAt
    }
  }
`;

export const GET_HELP_REQUEST_BY_ID = gql`
  query GetHelpRequestById($id: ID!) {
    getHelpRequestById(id: $id) {
      id
      description
      location
      isResolved
      volunteers
      createdAt
    }
  }
`;
