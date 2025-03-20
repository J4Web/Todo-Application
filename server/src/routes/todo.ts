import express from "express";

import { authenticate } from "../middleware/authMiddleware.ts";
import { getTodosForUser, createTodo } from "../controllers/todo.ts";
const router = express.Router();

router.use(authenticate);

router.post("/", createTodo);
router.delete("/:id", getTodosForUser);

export default router;
