import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cartID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
},{timestamps: true});

export default mongoose.model("CartItem", cartItemSchema);