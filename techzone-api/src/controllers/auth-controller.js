import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user-model.js";

export const login = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
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

    res
      .status(200)
      .json({ message: "Sessão iniciada com sucesso", user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};
