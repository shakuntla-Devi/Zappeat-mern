import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      name: String,
      email: String,
    },
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    totalAmount: Number,
  },
  { timestamps: true } // 🔥 IMPORTANT (date ke liye)
);

export default mongoose.model("Order", orderSchema);