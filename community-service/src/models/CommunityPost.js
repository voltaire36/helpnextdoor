import mongoose from "mongoose";

const { Schema } = mongoose;

const communityPostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, enum: ["news", "discussion"] },
  aiSummary: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);
export default CommunityPost;
