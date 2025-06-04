import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
