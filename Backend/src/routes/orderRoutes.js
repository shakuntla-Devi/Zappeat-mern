import express from "express";
import { placeOrder, getMyOrders, getAllOrders } from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ place order
router.post("/place", protect, placeOrder);

// ✅ user ke liye (My Orders)
router.get("/my-orders", protect, getMyOrders);

// ✅ admin ke liye (optional)
router.get("/all", protect, getAllOrders);

export default router;