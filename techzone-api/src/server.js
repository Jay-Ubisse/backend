import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { userRoute } from "./routes/user-routes.js";
import { authRoute } from "./routes/auth-routes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const host = process.env.HOST;
const port = process.env.PORT;

app.use("/users", userRoute);
app.use("/auth", authRoute);

mongoose
  .connect(process.env.BD_URI)
  .then(() => console.log("BD conectado com sucesso!"))
  .catch((error) =>
    console.log("Ocorreu um erro ao contectar com a DB: ", error)
  );

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
