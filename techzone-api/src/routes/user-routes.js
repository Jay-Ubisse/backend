import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  getMe,
} from "../controllers/user-controllers.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

export const userRoute = express.Router();
export const meRoute = express.Router();

userRoute.get("/", authenticateToken, getAllUsers);
userRoute.get("/:id", authenticateToken, getUser);
userRoute.post("/", createUser);
userRoute.put("/:id", authenticateToken, updateUser);
userRoute.delete("/:id", authenticateToken, deleteUser);

meRoute.get("/me", authenticateToken, getMe);
