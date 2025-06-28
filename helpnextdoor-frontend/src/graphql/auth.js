import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      id
      username
      email
      role
      token
    }
  }
`;
