import Sale from "../models/Sale.js";

export const createSale = async (req, res) => {
  try {
    const { taskId, products, customerName, paymentType } = req.body;

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
    res.status(500).json({ message: error.message });
  }
};

export const getMySales = async (req, res) => {
  try {
    const sales = await Sale.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
