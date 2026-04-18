import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// ✅ REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // 🔥 HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
    });

    // 🔥 TOKEN
    const token = jwt.sign(
      { id: user._id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 REMOVE PASSWORD
    const { password: pass, ...safeUser } = user._doc;

    res.status(201).json({
      message: "User registered successfully ✅",
      user: safeUser,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error ❌" });
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

    // 🔥 REMOVE PASSWORD
    const { password: pass, ...safeUser } = user._doc;

    res.json({
      user: safeUser,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login error ❌" });
  }
};