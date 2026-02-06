import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one cart per user
    }
},{timestamps: true});

export default mongoose.model("Cart", cartSchema);
