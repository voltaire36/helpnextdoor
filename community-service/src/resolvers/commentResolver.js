import Comment from "../models/Comment.js";

const commentResolvers = {
  Query: {
    getCommentsByPost: async (_, { postId }) => {
      return await Comment.find({ post: postId }).sort({ createdAt: -1 });
    },
  },
  Mutation: {
    addComment: async (_, { post, author, content }) => {
      const newComment = new Comment({ post, author, content });
      return await newComment.save();
    },
  },
};

export default commentResolvers;
