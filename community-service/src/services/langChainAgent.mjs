import { config } from "dotenv";
config();

import CommunityPost from "../models/CommunityPost.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import { FakeEmbeddings } from "langchain/embeddings/fake";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const runLangChainAgent = async (userQuery) => {
  const posts = await CommunityPost.find({
    $or: [
      { title: { $regex: userQuery, $options: "i" } },
      { content: { $regex: userQuery, $options: "i" } },
    ],
  });

  const docs = posts.map((p) => new Document({ pageContent: p.content }));
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new FakeEmbeddings()
  );
  const retriever = vectorStore.asRetriever();
  const relevantDocs = await retriever.getRelevantDocuments(userQuery);
  const contextText = relevantDocs.map((d) => d.pageContent).join("\n---\n");

  const promptText = `
You are a helpful assistant summarizing community discussions.

Context:
${contextText}

User asked: "${userQuery}"

Please respond clearly and suggest 3 follow-up questions.
`;

  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
  const result = await model.generateContent(promptText);
  const text = result.response.text();

  return {
    text,
    retrievedPosts: posts,
    suggestedQuestions: [
      "Would you like recent or older discussions?",
      "Do you prefer summaries or detailed responses?",
      "Should I include more related topics next time?",
    ],
  };
};

export { runLangChainAgent };
