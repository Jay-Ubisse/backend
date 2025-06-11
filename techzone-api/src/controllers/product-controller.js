import { Product } from "../models/user-model.js";
import { Category } from "../models/user-model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.status(200).json({ message: "ok", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const body = req.body;
    const { name, price, category, categoryId, sizes, stock } = body;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      res.status(404).json({ msg: "Categoria não encontrada" });
    }

    const product = await Product.create({
      name,
      price,
      category: existingCategory,
      categoryId,
      sizes: sizes || [],
      stock,
    });
    //68496fda03b5eeaac358a285
    res.status(201).json({ message: "Created", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};
