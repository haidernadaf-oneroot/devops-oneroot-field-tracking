// routes/product.routes.js
import express from "express";
import {
  createProduct,
  getProducts,
  updateProductQuantity,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE & GET ALL PRODUCTS
router
  .route("/")
  .post(protect, createProduct) // Accepts raw JSON with imageBase64
  .get(protect, getProducts);

// UPDATE QUANTITY
router.route("/:productId/quantity").patch(protect, updateProductQuantity);

// DELETE PRODUCT
router.route("/:productId").delete(protect, deleteProduct);

export default router;
