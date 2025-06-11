import { Category } from "../models/user-model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ message: "ok", categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};

export const createCategory = async (req, res) => {
  try {
    const body = req.body;
    const { name, description } = body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      res
        .status(400)
        .json({ message: "Já existe uma categoria com esse nome" });
    }

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({ message: "Created", category });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};
