

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/Db.js";

import foodRoutes from "./routes/foodRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

//  ENV CONFIG (TOP PE HI)
dotenv.config();

//  CHECK ENV (optional debug)
console.log("JWT SECRET:", process.env.JWT_SECRET ? "Loaded ✅" : "Missing ❌");

const app = express();

//  MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: [
    " http://localhost:5173",
    "https://zappeat-mern.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//  STATIC FILES (images)
app.use("/images", express.static("public"));

//  CONNECT DATABASE
connectDB();

//  TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 BACKEND API IS RUNNING...");
});

//  ROUTES
app.use("/api/food", foodRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

//  SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(" BACKEND API IS RUNNING...");
});