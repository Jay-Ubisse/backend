import express from "express";
import dotenv from "dotenv";
import { userRoute } from "./routes/user-routes.js";

const app = express();
dotenv.config();
app.use(express.json());

const host = process.env.HOST;
const port = process.env.PORT;

app.use("/users", userRoute);

app.listen(port, () => console.log(`Server running on ${host}:${port}`));
