import mongoose from "mongoose";
const { Schema, model } = mongoose;

const pastInteractionSchema = new Schema({
  userQuery: { type: String, required: true },
  aiResponse: { type: String, required: true },
  suggestedQuestions: [String],
  timestamp: { type: Date, default: Date.now },
});

const PastInteraction = model("PastInteraction", pastInteractionSchema);
export default PastInteraction;
