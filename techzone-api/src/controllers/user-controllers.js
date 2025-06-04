import { users } from "../models/user-model.js";

export const getAllUsers = (req, res) => {
  const u = users.map((user) => {
    const { password, ...rest } = user;

    return rest;
  });

  res.status(200).json({ message: "ok", users: u });
};

export const createUser = (req, res) => {
  const body = req.body;
  const { name, email, password } = body;

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    res
      .status(400)
      .json({ message: "Já existe um usuário cadastrado com este email." });
  }

  const usersLength = users.length;

  const user = {
    id: usersLength + 1,
    name,
    email,
    password,
  };

  users.push(user);

  res.status(201).json({ message: "Usuário criado com sucesso", user });
};

export const getUser = (req, res) => {
  const id = req.params.id;

  const existingUser = users.find((user) => user.id === Number(id));

  if (!existingUser) {
    res.json({ message: "Usuário não encontrado" });
  }

  res.status(200).json({ message: "ok", existingUser });
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { name, email, password } = body;

  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    res.json({ message: "Usuário não encontrado" });
  }

  user.email = email;
  user.name = name;
  user.password = password;

  res.status(200).json({ message: "Usuário actualizado com sucesso", user });
};

export const deleteUser = (req, res) => {
  const id = req.params.id;

  const user = users.find((user) => user.id === Number(id));

  if (!user) {
    res.json({ message: "Usuário não encontrado" });
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  res
    .status(200)
    .json({ message: "Usuário Eliminado com sucesso com sucesso", user });
};
