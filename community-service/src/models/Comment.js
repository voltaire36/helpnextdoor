import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "CommunityPost", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = model("Comment", commentSchema);
export default Comment;
