import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["field", "office"],
      default: "field",
    },
    pushToken: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
