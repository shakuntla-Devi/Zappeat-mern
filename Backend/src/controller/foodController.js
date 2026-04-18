import Food from "../models/foodModel.js";

// ➕ ADD FOOD
export const addFood = async (req, res) => {
  try {
    const { name, image, price, category, description } = req.body;

    const food = new Food({
      name,
      image,
      price,
      category,
      description,
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding food",
    });
  }
};

// 📦 GET ALL FOOD
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();

    res.status(200).json({
      success: true,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching foods",
    });
  }
};