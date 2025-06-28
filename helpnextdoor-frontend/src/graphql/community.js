import { gql } from "@apollo/client";

export const GET_PAGINATED_DISCUSSIONS = gql`
  query GetPaginatedPosts($limit: Int!, $offset: Int!, $category: String!) {
    getPaginatedPosts(limit: $limit, offset: $offset, category: $category) {
      id
      title
      content
      category
      author {
        username
      }
      createdAt
    }
  }
`;

export const CREATE_DISCUSSION_POST = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $category: String!
    $author: ID!
  ) {
    createPost(
      title: $title
      content: $content
      category: $category
      author: $author
    ) {
      id
      title
      content
      category
      author {
        username
      }
      createdAt
    }
  }
`;

export const UPDATE_DISCUSSION_POST = gql`
  mutation UpdatePost($id: ID!, $content: String!, $aiSummary: String) {
    updatePost(id: $id, content: $content, aiSummary: $aiSummary) {
      id
      content
      aiSummary
      updatedAt
    }
  }
`;

export const GET_DISCUSSION_BY_ID = gql`
  query GetPostById($id: ID!) {
    getPostById(id: $id) {
      id
      title
      content
      category
      author {
        username
      }
      createdAt
    }
  }
`;

export const COMMUNITY_AI_QUERY = gql`
  query CommunityAIQuery($input: String!) {
    communityAIQuery(input: $input) {
      text
      retrievedPosts {
        title
        content
      }
    }
  }
`;

export const DELETE_DISCUSSION_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
