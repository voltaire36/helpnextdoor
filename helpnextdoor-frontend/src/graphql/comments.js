import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation AddComment($post: ID!, $author: ID!, $content: String!) {
    addComment(post: $post, author: $author, content: $content) {
      id
      content
      post
      author
      createdAt
    }
  }
`;

export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: ID!) {
    getCommentsByPost(postId: $postId) {
      id
      content
      author
      createdAt
    }
  }
`;
