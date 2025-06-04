import { users } from "../models/user-model.js";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const body = req.body;
  const { email, password } = body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.status(401).json({ message: "Email ou palavra-passe incorreto." });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({ message: "Sessão iniciada com sucesso", user, token });
};
