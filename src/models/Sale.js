import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   crop: String,
//   product: String,
//   qty: Number,
//   price: Number,
//   total: Number,
// });

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // ✅ reference
    required: true,
  },
  qty: Number,
  price: Number,
  total: Number,
});

const saleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    products: [productSchema],
    customerName: String,
    paymentType: {
      type: String,
      enum: ["cash", "online"],
      default: "cash",
    },
    grandTotal: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
