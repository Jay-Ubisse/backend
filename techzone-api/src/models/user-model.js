import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model("user", userSchema);

const categorySchecma = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

export const Category = mongoose.model("Category", categorySchecma);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  categoryId: { type: String, required: true },
  sizes: { type: [String], default: [] },
  stock: { type: Number, required: true, default: 0 },
});

export const Product = mongoose.model("Product", productSchema);
