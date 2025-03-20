import pool from "../utils/db";

import { todoDB } from "../database/todo-repository";
// Get All Todos
export const getTodosFoUser = async (req, res) => {
    try {
        const todos = await todoDB.getTodoUser({ username: req.user.username });
        res.json(todos.rows);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getTodoById = async (req, res) => {
    try {
        const todo = await pool.query("SELECT * FROM todos WHERE id = $1 AND user_id = $2", [req.params.id, req.user.userId]);

        if (todo.rows.length === 0) return res.status(404).json({ message: "Todo not found" });

        res.json(todo.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Create Todo
export const createTodo = async (req, res) => {
    const { title, description, priority, tags } = req.body;

    try {
        const newTodo = await pool.query("INSERT INTO todos (title, description, priority, tags, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [
            title,
            description,
            priority,
            tags,
            req.user.userId,
        ]);

        res.status(201).json(newTodo.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Update Todo
export const updateTodo = async (req, res) => {
    const { title, description, priority, tags } = req.body;

    try {
        await pool.query("UPDATE todos SET title = $1, description = $2, priority = $3, tags = $4 WHERE id = $5 AND user_id = $6", [
            title,
            description,
            priority,
            tags,
            req.params.id,
            req.user.userId,
        ]);

        res.json({ message: "Todo updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
    try {
        await pool.query("DELETE FROM todos WHERE id = $1 AND user_id = $2", [req.params.id, req.user.userId]);
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
