import { gql } from "apollo-server-express";

const typeDefs = gql`
  # -------------------------
  # User (for author references)
  # -------------------------
  type User {
    id: ID!
    username: String!
  }

  # -------------------------
  # Community Post
  # -------------------------
  type CommunityPost {
    id: ID!
    author: User!
    title: String!
    content: String!
    category: String!
    aiSummary: String
    createdAt: String
    updatedAt: String
  }

  # -------------------------
  # Help Request
  # -------------------------
  type HelpRequest {
    id: ID!
    author: User!
    description: String!
    location: String
    isResolved: Boolean
    volunteers: [ID]
    createdAt: String
    updatedAt: String
  }

  # -------------------------
  # Comment
  # -------------------------
  type Comment {
    id: ID!
    post: ID!
    author: ID!
    content: String!
    createdAt: String
  }

  # -------------------------
  # AI Response
  # -------------------------
  type AIResponse {
    text: String!
    suggestedQuestions: [String]!
    retrievedPosts: [CommunityPost]!
  }

  # -------------------------
  # Queries
  # -------------------------
  type Query {
    getAllPosts: [CommunityPost]
    getPostById(id: ID!): CommunityPost
    getPaginatedPosts(
      limit: Int!
      offset: Int!
      category: String!
    ): [CommunityPost]

    getAllHelpRequests: [HelpRequest]
    getHelpRequestById(id: ID!): HelpRequest
    getPaginatedHelpRequests(limit: Int!, offset: Int!): [HelpRequest]
    getHelpRequestsByUser(userId: ID!): [HelpRequest]

    getCommentsByPost(postId: ID!): [Comment]
    communityAIQuery(input: String!): AIResponse!
  }

  # -------------------------
  # Mutations
  # -------------------------
  type Mutation {
    createPost(
      author: ID!
      title: String!
      content: String!
      category: String!
    ): CommunityPost
    updatePost(
      id: ID!
      content: String
      category: String
      aiSummary: String
    ): CommunityPost
    deletePost(id: ID!): Boolean #
    createHelpRequest(
      author: ID!
      description: String!
      location: String
    ): HelpRequest
    updateHelpRequest(
      id: ID!
      description: String!
      location: String!
    ): HelpRequest
    resolveHelpRequest(id: ID!): HelpRequest
    volunteerForHelp(id: ID!, userId: ID!): HelpRequest
    deleteHelpRequest(id: ID!): Boolean

    addComment(post: ID!, author: ID!, content: String!): Comment
  }
`;

export default typeDefs;
