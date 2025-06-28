const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./resolvers/authResolver");
require("dotenv").config();

const startServer = async () => {
  const app = express();

  await connectDB();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(
      `🚀 Auth service ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startServer();
