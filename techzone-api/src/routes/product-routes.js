import express from "express";
import { authenticateToken } from "../middleware/auth-middleware.js";
import {
  getAllProducts,
  createProduct,
} from "../controllers/product-controller.js";

export const productRoute = express.Router();

productRoute.get("/", authenticateToken, getAllProducts);
productRoute.post("/", authenticateToken, createProduct);
