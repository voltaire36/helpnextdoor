import { communityAIHandler } from "../services/aiAgentService.js";

const aiResolver = {
  Query: {
    communityAIQuery: async (_, { input }) => {
      return await communityAIHandler(input);
    },
  },
};

export default aiResolver;
