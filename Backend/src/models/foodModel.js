import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // backend image URL
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required:true,
    },
    description: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);

export default Food;