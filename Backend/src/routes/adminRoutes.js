import express from "express";
import {
  sendMessage,
  getAllMessages,
  deleteMessage
} from "../controller/contactController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

//  user must be logged in
router.post("/send", protect, sendMessage);

//  only admin
router.get("/messages", protect, adminOnly, getAllMessages);

//  only admin
router.delete("/message/:id", protect, adminOnly, deleteMessage);

export default router;