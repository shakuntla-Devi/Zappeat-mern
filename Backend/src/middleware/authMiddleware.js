import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;
    console.log("AUTH HEADER:", req.headers.authorization);
    // 🔥 CHECK + EXTRACT TOKEN
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

    // 🔥 VERIFY
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
     console.log("JWT ERROR:", error.message); 
    res.status(401).json({ message: "Invalid token ❌" });
  }
};