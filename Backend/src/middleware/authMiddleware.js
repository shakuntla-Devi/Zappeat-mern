import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    console.log("AUTH HEADER:", req.headers.authorization);

    // ✅ extract token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ no token
    if (!token) {
      return res.status(401).json({ message: "No token ❌" });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 IMPORTANT FIX (full user fetch)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found ❌" });
    }

    req.user = user; // ✅ now full user object

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    res.status(401).json({ message: "Invalid token ❌" });
  }
};