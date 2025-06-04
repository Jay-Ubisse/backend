import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

export const login = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  const user = await User.findOne({ email, password });

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
