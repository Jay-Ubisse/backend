import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({ message: "ok", users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const body = req.body;
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "Já existe um usuário cadastrado com este email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const existingUser = await User.findById(id).select("-password");

    if (!existingUser) {
      res.json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "ok", existingUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { name, email, password } = body;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      res.json({ message: "Usuário não encontrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findById(id).updateOne({
      name,
      email,
      password: hashedPassword,
    });

    const user = await User.findById(id).select("-password");
    res.status(200).json({ message: "Usuário actualizado com sucesso", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.deleteOne({ id });

    if (!user) {
      res.json({ message: "Usuário não encontrado" });
    }

    res
      .status(200)
      .json({ message: "Usuário Eliminado com sucesso com sucesso", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};
