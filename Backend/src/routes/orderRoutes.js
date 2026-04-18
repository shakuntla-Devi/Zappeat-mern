import express from "express";
import { placeOrder, getAllOrders } from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// only logged-in user can place order
router.post("/place", protect, placeOrder);

//  only logged-in user can see orders
router.get("/", protect, getAllOrders);

export default router;