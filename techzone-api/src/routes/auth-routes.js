import express from "express";
import { login } from "../controllers/auth-controller.js";

export const authRoute = express.Router();

authRoute.post("/login", login);
