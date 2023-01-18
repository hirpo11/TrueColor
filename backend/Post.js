import mongoose from "mongoose";

const Post = new mongoose.Schema({
  number: { type: Number, required: true },
  color: { type: Array, required: true },
  picture: { type: String },
});

export default mongoose.model("Post", Post);
