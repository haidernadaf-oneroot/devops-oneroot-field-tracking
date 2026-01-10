// import Sale from "../models/Sale.js";

// export const createSale = async (req, res) => {
//   try {
//     const { taskId, products, customerName, paymentType } = req.body;

//     const grandTotal = products.reduce((sum, p) => sum + Number(p.total), 0);

//     const sale = await Sale.create({
//       user: req.user._id,
//       task: taskId,
//       products,
//       customerName,
//       paymentType,
//       grandTotal,
//     });

//     res.status(201).json(sale);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getMySales = async (req, res) => {
//   try {
//     const sales = await Sale.find({ user: req.user._id }).sort({
//       createdAt: -1,
//     });

//     res.json(sales);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// import Sale from "../models/Sale.js";
// import Product from "../models/Product.js";

// export const createSale = async (req, res) => {
//   try {
//     const { taskId, products, customerName, paymentType } = req.body;

//     if (!taskId || !products || products.length === 0) {
//       return res.status(400).json({ message: "Missing sale data" });
//     }

//     // ✅ reduce inventory stock
//     for (const item of products) {
//       const dbProduct = await Product.findOne({ name: item.product });

//       if (!dbProduct) {
//         return res
//           .status(400)
//           .json({ message: `Product not found: ${item.product}` });
//       }

//       if (dbProduct.quantity < item.qty) {
//         return res.status(400).json({
//           message: `Not enough stock for ${item.product}`,
//         });
//       }

//       dbProduct.quantity -= item.qty;
//       await dbProduct.save();
//     }

//     const grandTotal = products.reduce((sum, p) => sum + Number(p.total), 0);

//     const sale = await Sale.create({
//       user: req.user._id,
//       task: taskId,
//       products,
//       customerName,
//       paymentType,
//       grandTotal,
//     });

//     res.status(201).json(sale);
//   } catch (error) {
//     console.error("Create sale error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getAllSales = async (req, res) => {
//   try {
//     const sales = await Sale.find()
//       .populate("user", "name phone")
//       .populate({
//         path: "task",
//         select: "title crop locationName status",
//         populate: {
//           path: "assignedTo",
//           select: "name phone",
//         },
//       })
//       .sort({ createdAt: -1 });

//     res.json(sales);
//   } catch (error) {
//     console.error("Get all sales error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

// ---------------- CREATE SALE ----------------
export const createSale = async (req, res) => {
  try {
    const { taskId, products, customerName, paymentType } = req.body;

    if (!taskId || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing sale data" });
    }

    // ✅ reduce inventory stock
    for (const item of products) {
      // const dbProduct = await Product.findOne({ name: item.product });
      const dbProduct = await Product.findById(item.product);

      if (!dbProduct) {
        return res
          .status(400)
          .json({ message: `Product not found: ${item.product}` });
      }

      if (dbProduct.quantity < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${item.product}`,
        });
      }

      dbProduct.quantity -= item.qty;
      await dbProduct.save();
    }

    const grandTotal = products.reduce((sum, p) => sum + Number(p.total), 0);

    const sale = await Sale.create({
      user: req.user._id,
      task: taskId,
      products,
      customerName,
      paymentType,
      grandTotal,
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error("Create sale error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ---------------- AGENT: MY SALES ----------------
export const getMySales = async (req, res) => {
  try {
    const sales = await Sale.find({ user: req.user._id })
      .populate("task", "title crop locationName status")
      .sort({ createdAt: -1 });

    res.json(sales);
  } catch (error) {
    console.error("Get my sales error:", error);
    res.status(500).json({ message: error.message });
  }
};
