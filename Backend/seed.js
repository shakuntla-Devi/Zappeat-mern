import mongoose from "mongoose";
import dotenv from "dotenv";
import { foodData } from "./data/foodData.js";
import Food from "./src/models/foodModel.js";


dotenv.config();

const seedData = async () => {
  try {
    // MongoDB connect
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // Old data delete (optional but recommended)
    await Food.deleteMany();

    console.log("🗑️ Old data deleted");

    // Insert new data
    await Food.insertMany(foodData);

    console.log("🎉 Data Inserted Successfully");

    process.exit();
  } catch (error) {
    console.log("❌ Error:", error);
    process.exit(1);
  }
};

seedData();