import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user-controllers.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

export const userRoute = express.Router();

userRoute.get("/", authenticateToken, getAllUsers);
userRoute.get("/:id", authenticateToken, getUser);
userRoute.post("/", createUser);
userRoute.put("/:id", authenticateToken, updateUser);
userRoute.delete("/:id", authenticateToken, deleteUser);
