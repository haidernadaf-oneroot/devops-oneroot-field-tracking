import express from "express";
import {
  getAllUsers,
  getAllTasks,
  createTaskAdmin,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/tasks", protect, getAllTasks);
router.post("/tasks", protect, createTaskAdmin);

export default router;
