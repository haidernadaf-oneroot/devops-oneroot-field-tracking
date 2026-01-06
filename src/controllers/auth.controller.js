import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    let user = await User.findOne({ phone });

    // If user not exists → create
    if (!user) {
      user = await User.create({
        name,
        phone,
        role: "field",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
