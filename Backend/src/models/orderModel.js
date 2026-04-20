import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],

    // 🔥 ADD THIS (city fix ke liye)
    address: {
      address: String,
      city: String,
    },

    // 🔥 already hai but ensure use ho raha
    totalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);