import User from "../models/User.js";

// CREATE USER (SIGN UP)
export const createUser = async (req, res) => {
  try {
    const { name, phone, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const user = await User.create({
      name,
      phone,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET USER BY PHONE (LOGIN-LIKE)
export const getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.query;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
