import express from "express";
import { createUser, getUserByPhone } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUserByPhone);

export default router;
