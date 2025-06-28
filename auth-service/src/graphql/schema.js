const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String
    token: String
  }

  type Query {
    _empty: String #
  }

  type Mutation {
    signup(
      username: String!
      email: String!
      password: String!
      role: String!
    ): User
    login(email: String!, password: String!): User
    logout: String
  }
`;
