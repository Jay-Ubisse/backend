import { User } from "../models/user-model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({ message: "ok", users });
};

export const createUser = async (req, res) => {
  const body = req.body;
  const { name, email, password } = body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res
      .status(400)
      .json({ message: "Já existe um usuário cadastrado com este email." });
  }

  const user = await User.create({
    email,
    name,
    password,
  });

  res.status(201).json({ message: "Usuário criado com sucesso", user });
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  const existingUser = await User.findById(id);

  if (!existingUser) {
    res.json({ message: "Usuário não encontrado" });
  }

  res.status(200).json({ message: "ok", existingUser });
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { name, email, password } = body;

  const existingUser = await User.findById(id);

  if (!existingUser) {
    res.json({ message: "Usuário não encontrado" });
  }

  const user = await User.updateOne({ id }, { name, email, password });

  res.status(200).json({ message: "Usuário actualizado com sucesso", user });
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.deleteOne({ id });

  if (!user) {
    res.json({ message: "Usuário não encontrado" });
  }

  res
    .status(200)
    .json({ message: "Usuário Eliminado com sucesso com sucesso", user });
};
