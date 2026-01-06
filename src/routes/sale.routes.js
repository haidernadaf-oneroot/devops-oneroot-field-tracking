import express from "express";
import { createSale, getMySales } from "../controllers/sale.controller.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createSale);
router.get("/my", auth, getMySales);

export default router;
