import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";
import { errors } from "./middleware/error-middleware.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use(errors);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
