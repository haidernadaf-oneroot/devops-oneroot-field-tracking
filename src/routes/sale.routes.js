import express from "express";
import { createSale, getMySales } from "../controllers/sale.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createSale);
router.get("/my", protect, getMySales);

export default router;
