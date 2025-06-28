import React from "react";
import { ApolloProvider } from "@apollo/client";
import { communityClient } from "../utils/communityApolloClient";
import MainForumPageTEMP from "./MainForumPageTEMP";

export default function MainForumWrapper() {
  return (
    <ApolloProvider client={communityClient}>
      <MainForumPageTEMP />
    </ApolloProvider>
  );
}