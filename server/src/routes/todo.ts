import express from "express";

import { authenticate } from "../middleware/authMiddleware.js";
import {
  getTodosForUser,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";
const router = express.Router();

router.use(authenticate);

router.post("/", createTodo);
router.get("/:username", getTodosForUser);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
