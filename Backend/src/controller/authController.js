import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ✅ REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    const token = jwt.sign(
      { id: user._id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ YAHAN LIKHNA HAI (IMPORTANT 🔥)
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender
    };

    res.status(201).json({
      message: "User registered successfully ✅",
      user: safeUser,
      token,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ LOGIN
export const loginUser = async (req, res) => { 
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // ❌ user not found
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    // 🔥 COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    // 🔥 TOKEN
    const token = jwt.sign(
      { id: user._id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ SAFE USER (FINAL FIX 🔥)
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender
    };

    res.json({
      user: safeUser,
      token,
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};