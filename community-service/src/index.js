import { config } from "dotenv";
config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/db.js";
import typeDefs from "./graphql/schema.js";
import communityResolvers from "./resolvers/communityResolver.js";
import commentResolvers from "./resolvers/commentResolver.js";
import aiResolver from "./resolvers/aiResolver.js";

const startServer = async () => {
  const app = express();
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers: [communityResolvers, commentResolvers, aiResolver],
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer();
