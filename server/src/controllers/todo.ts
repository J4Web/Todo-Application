import { todoDB } from "../database/todo-repository.ts";
// Get All Todos
export const getTodosForUser = async (req, res) => {
  try {
    const todos = await todoDB.getTodoUser({ username: req.user.username });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create Todo
export const createTodo = async (req, res) => {
  const { title, description, priority, tags } = req.body;

  try {
    const newTodo = await todoDB.createTodo({
      title,
      description,
      priority,
      tags,
      user_id: req,
    });

    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  const { title, description, priority, tags } = req.body;

  try {
    await pool.query(
      "UPDATE todos SET title = $1, description = $2, priority = $3, tags = $4 WHERE id = $5 AND user_id = $6",
      [title, description, priority, tags, req.params.id, req.user.userId]
    );

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    await pool.query("DELETE FROM todos WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.userId,
    ]);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
