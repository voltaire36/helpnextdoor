import CommunityPost from "../models/CommunityPost.js";
import HelpRequest from "../models/HelpRequest.js";
import { verifyToken } from "../config/auth.js";
import User from "../models/User.js";

const communityResolvers = {
  Query: {
    getAllPosts: async () => {
      return await CommunityPost.find().sort({ createdAt: -1 });
    },

    getPostById: async (_, { id }) => {
      const post = await CommunityPost.findById(id).populate(
        "author",
        "username"
      );
      if (!post) throw new Error("Post not found");
      return post;
    },

    getPaginatedPosts: async (_, { limit, offset, category }) => {
      return await CommunityPost.find({ category })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate("author", "username");
    },

    getAllHelpRequests: async () => {
      return await HelpRequest.find().sort({ createdAt: -1 });
    },

    getHelpRequestById: async (_, { id }) => {
      const help = await HelpRequest.findById(id);
      if (!help) throw new Error("Help request not found");
      return help;
    },

    getPaginatedHelpRequests: async (_, { limit, offset }) => {
      return await HelpRequest.find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate("author", "username");
    },

    getHelpRequestsByUser: async (_, { userId }) => {
      return await HelpRequest.find({ author: userId })
        .sort({ createdAt: -1 })
        .populate("author", "username");
    },
  },

  Mutation: {
    createPost: async (_, { author, title, content, category }, context) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      const user = verifyToken(token);

      if (category === "news" && user.role === "resident") {
        throw new Error("Residents are not allowed to post news.");
      }

      const newPost = new CommunityPost({
        author,
        title,
        content,
        category,
        createdAt: Date.now(),
      });

      const savedPost = await newPost.save();
      return await CommunityPost.findById(savedPost._id).populate(
        "author",
        "username"
      );
    },

    updatePost: async (_, { id, content, aiSummary }, context) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      const user = verifyToken(token);

      const post = await CommunityPost.findById(id);
      if (!post) throw new Error("Post not found");

      if (
        String(post.author) !== user.id &&
        user.role !== "community_organizer"
      ) {
        throw new Error("Unauthorized to update this post");
      }

      post.content = content;
      post.aiSummary = aiSummary;
      post.updatedAt = Date.now();

      return await post.save();
    },

    deletePost: async (_, { id }, context) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      const user = verifyToken(token);

      const post = await CommunityPost.findById(id);
      if (!post) throw new Error("Post not found");

      if (
        String(post.author) !== user.id &&
        user.role !== "community_organizer"
      ) {
        throw new Error("Unauthorized to delete this post");
      }

      await CommunityPost.findByIdAndDelete(id);
      return true;
    },

    createHelpRequest: async (
      _,
      { author, description, location },
      context
    ) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      const user = verifyToken(token);

      const helpRequest = new HelpRequest({
        author,
        description,
        location,
        createdAt: Date.now(),
      });

      const saved = await helpRequest.save();
      return await HelpRequest.findById(saved._id).populate(
        "author",
        "username"
      );
    },

    updateHelpRequest: async (_, { id, description, location }, context) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      const user = verifyToken(token);

      const help = await HelpRequest.findById(id);
      if (!help) throw new Error("Help request not found");

      if (
        String(help.author) !== user.id &&
        user.role !== "community_organizer"
      ) {
        throw new Error("Unauthorized to update this help request");
      }

      help.description = description;
      help.location = location;
      help.updatedAt = Date.now();

      return await help.save();
    },

    resolveHelpRequest: async (_, { id }, context) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      const user = verifyToken(token);

      if (user.role !== "community_organizer") {
        throw new Error("Only community organizers can resolve help requests.");
      }

      const help = await HelpRequest.findById(id);
      if (!help) throw new Error("Help request not found");

      help.isResolved = true;
      help.updatedAt = Date.now();
      return await help.save();
    },

    volunteerForHelp: async (_, { id, userId }, context) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      const user = verifyToken(token);

      const help = await HelpRequest.findById(id);
      if (!help) throw new Error("Help request not found");

      if (help.isResolved) {
        throw new Error("Cannot volunteer for a resolved help request.");
      }

      if (!help.volunteers.includes(userId)) {
        help.volunteers.push(userId);
        help.updatedAt = Date.now();
        await help.save();
      }

      return help;
    },

    deleteHelpRequest: async (_, { id }, context) => {
      const token = context.req.headers.authorization?.split(" ")[1];
      const user = verifyToken(token);

      const help = await HelpRequest.findById(id);
      if (!help) throw new Error("Help request not found");

      if (
        String(help.author) !== user.id &&
        user.role !== "community_organizer"
      ) {
        throw new Error("Unauthorized to delete this help request");
      }

      await HelpRequest.findByIdAndDelete(id);
      return true;
    },
  },
};

export default communityResolvers;
