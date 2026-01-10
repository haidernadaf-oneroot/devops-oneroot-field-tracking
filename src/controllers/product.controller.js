// controllers/product.controller.js
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// controllers/product.controller.js

// export const createProduct = async (req, res) => {
//   try {
//     const { name, price, quantity, imageBase64 } = req.body;

//     if (!name || !price || !quantity || !imageBase64) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "All fields (name, price, quantity, imageBase64) are required",
//         });
//     }

//     // Validate base64
//     if (!imageBase64.startsWith("data:image")) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "imageBase64 must be a valid base64 string (data:image/jpeg;base64,...)",
//         });
//     }

//     // Upload to Cloudinary directly from base64
//     const uploadResult = await cloudinary.uploader.upload(imageBase64, {
//       folder: "inventory/products",
//       resource_type: "image",
//     });

//     const product = await Product.create({
//       name: name.trim(),
//       price: Number(price),
//       quantity: Number(quantity),
//       imageUrl: uploadResult.secure_url,
//       imagePublicId: uploadResult.public_id,
//       createdBy: req.user._id,
//     });

//     res.status(201).json({
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     console.error("Create product error:", error);
//     res.status(500).json({ message: error.message || "Server error" });
//   }
// };

// export const createProduct = async (req, res) => {
//   try {
//     let { name, price, quantity, imageBase64 } = req.body;

//     if (!name || !price || !quantity || !imageBase64) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Ensure it has data URI prefix
//     if (!imageBase64.startsWith("data:image")) {
//       return res
//         .status(400)
//         .json({ message: "Invalid base64 format. Must start with data:image" });
//     }

//     // For large images (>10MB), use upload_large
//     const isLarge = imageBase64.length > 10 * 1024 * 1024; // ~10MB in characters

//     const uploadMethod = isLarge
//       ? cloudinary.uploader.upload_large
//       : cloudinary.uploader.upload;

//     const uploadResult = await uploadMethod(imageBase64, {
//       folder: "inventory/products",
//       resource_type: "image",
//     });

//     const product = await Product.create({
//       name: name.trim(),
//       price: Number(price),
//       quantity: Number(quantity),
//       imageUrl: uploadResult.secure_url,
//       imagePublicId: uploadResult.public_id,
//       createdBy: req.user._id,
//     });

//     res.status(201).json({
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     console.error("Create product error:", error);
//     if (error.http_code === 400 && error.message.includes("base64")) {
//       return res.status(400).json({ message: "Invalid base64 image data" });
//     }
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const createProduct = async (req, res) => {
  try {
    let { name, crop, price, quantity, imageBase64 } = req.body;

    if (!name || !price || !quantity || !imageBase64) {
      return res.status(400).json({ message: "All fields are required" });
    }

    name = name.trim();

    // ✅ check if product already exists
    const existingProduct = await Product.findOne({ name, crop });

    // ---------- IMAGE UPLOAD ----------
    if (!imageBase64.startsWith("data:image")) {
      return res
        .status(400)
        .json({ message: "Invalid base64 format. Must start with data:image" });
    }

    const isLarge = imageBase64.length > 10 * 1024 * 1024;
    const uploadMethod = isLarge
      ? cloudinary.uploader.upload_large
      : cloudinary.uploader.upload;

    const uploadResult = await uploadMethod(imageBase64, {
      folder: "inventory/products",
      resource_type: "image",
    });

    // ---------- IF PRODUCT EXISTS → UPDATE ----------
    if (existingProduct) {
      existingProduct.quantity += Number(quantity);

      // (optional) update image
      existingProduct.imageUrl = uploadResult.secure_url;
      existingProduct.imagePublicId = uploadResult.public_id;

      await existingProduct.save();

      return res.json({
        message: "Product already exists, quantity updated",
        product: existingProduct,
      });
    }

    // ---------- ELSE CREATE NEW ----------
    const product = await Product.create({
      name,
      crop,
      price: Number(price),
      quantity: Number(quantity),
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE QUANTITY (increase/decrease stock)
export const updateProductQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantityChange } = req.body; // +10 or -5

    if (!quantityChange || isNaN(quantityChange)) {
      return res
        .status(400)
        .json({ message: "quantityChange is required and must be a number" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newQuantity = product.quantity + Number(quantityChange);

    if (newQuantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    product.quantity = newQuantity;
    await product.save();

    res.json({
      message: "Quantity updated",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional: DELETE PRODUCT & remove image
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    // ✅ delete from MongoDB (Mongoose v7)
    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
