import pool from "../utils/db.ts";

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT id, username FROM users");
    res.json(users.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [req.params.id]
    );

    if (user.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { username } = req.body;

  try {
    await pool.query("UPDATE users SET username = $1 WHERE id = $2", [
      username,
      req.params.id,
    ]);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
