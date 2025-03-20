import express from "express";
// import {
//   getTodos,
//   createTodo,
//   deleteTodo,
// } from "../controllers/todoController";
import { authenticate } from "../middleware/authMiddleware";
import { getTodosFoUser } from "../controllers/todoController";
const router = express.Router();

// router.get("/", authenticate, getTodos);
// router.post("/", authenticate, createTodo);
router.delete("/:id", authenticate, getTodosFoUser);

export default router;
