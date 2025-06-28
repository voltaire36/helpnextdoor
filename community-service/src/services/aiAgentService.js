import dotenv from "dotenv";
dotenv.config();

import PastInteraction from "../models/PastInteraction.js";

export async function communityAIHandler(input) {
  const { runLangChainAgent } = await import("./langChainAgent.mjs");

  const aiResult = await runLangChainAgent(input);

  await PastInteraction.create({
    userQuery: input,
    aiResponse: aiResult.text,
    suggestedQuestions: aiResult.suggestedQuestions,
  });

  return {
    text: aiResult.text,
    suggestedQuestions: aiResult.suggestedQuestions,
    retrievedPosts: aiResult.retrievedPosts,
  };
}
