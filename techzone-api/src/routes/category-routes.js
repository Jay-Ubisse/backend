import express from "express";
import { authenticateToken } from "../middleware/auth-middleware.js";
import {
  getAllCategories,
  createCategory,
} from "../controllers/category-controller.js";

export const categoryRoute = express.Router();

categoryRoute.get("/", authenticateToken, getAllCategories);
categoryRoute.post("/", authenticateToken, createCategory);
