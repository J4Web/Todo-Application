import type { RequestHandler } from "express";
import { todoDB } from "../database/todo-repository.ts";
import { userDB } from "../database/user-repository.ts";
export const getTodosForUser: RequestHandler = async (req, res) => {
  try {
    const todos = await todoDB.getTodoUser({ username: req.params.username });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create Todo
export const createTodo: RequestHandler = async (req, res, next) => {
  const { title, description, priority, tags, mentions } = req.body;

  try {
    const newTodo = await todoDB.createTodo({
      title,
      description,
      priority,
      tags,
      mentions,
      //@ts-ignore
      userId: req?.user?.id,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Update Todo
export const updateTodo: RequestHandler = async (req, res, next) => {
  const { title, description, priority, tags } = req.body;
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Missing ID in request parameters" });
    return;
  }

  try {
    await todoDB.updateTodo(id, { title, description, priority, tags });

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error("Error updating todo:", error);
    next(error);
  }
};

// Delete Todo
export const deleteTodo: RequestHandler = async (req, res) => {
  try {
    await todoDB.deleteTodo({
      id: req.params.id,
    });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateNote: RequestHandler = async (req, res) => {
  try {
    const { id, note } = req.body;
    await todoDB.updateTodo(id, note);
    res.json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
