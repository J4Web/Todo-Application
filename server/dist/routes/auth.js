import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";
const router = express.Router();
router.post("/register", registerUser); // Register a user
router.post("/login", loginUser); // Login and return JWT
export default router;
