var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { todoDB } from "../database/todo-repository.js";
export const getTodosForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoDB.getTodoUser({ username: req.params.username });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
// Create Todo
export const createTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, priority, tags, mentions } = req.body;
    try {
        const newTodo = yield todoDB.createTodo({
            title,
            description,
            priority,
            tags,
            mentions,
            //@ts-ignore
            userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        res.status(201).json(newTodo);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
// Update Todo
export const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority, tags } = req.body;
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Missing ID in request parameters" });
        return;
    }
    try {
        yield todoDB.updateTodo(id, { title, description, priority, tags });
        res.json({ message: "Todo updated successfully" });
    }
    catch (error) {
        console.error("Error updating todo:", error);
        next(error);
    }
});
// Delete Todo
export const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield todoDB.deleteTodo({
            id: req.params.id,
        });
        res.json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
export const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, note } = req.body;
        yield todoDB.updateTodo(id, note);
        res.json({ message: "Note updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
