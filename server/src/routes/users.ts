import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.ts";

const router = express.Router();

router.get("/", getUsers); // Get all users
router.get("/:id", getUserById); // Get a single user
router.put("/:id", updateUser); // Update user details
router.delete("/:id", deleteUser); // Delete a user

export default router;
