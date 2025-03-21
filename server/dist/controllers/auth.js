var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { userDB } from "../database/user-repository.js";
// Register User
export const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        // Check if username is already taken
        if (yield userDB.isUsernameTaken(username)) {
            res.status(400).json({
                ok: false,
                message: "Username already taken",
            });
            return;
        }
        const user = yield userDB.createUser({ username, password });
        res.status(201).json({
            ok: true,
            result: {
                user: { id: user.id, username: user.username },
                auth_token: generateAuthToken(user),
            },
            message: "User created successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
// Login User
export const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (!(yield userDB.isUserExists({ username }))) {
            res.status(400).json({
                ok: false,
                message: `User is not registered`,
            });
            return;
        }
        if (!(yield userDB.isValidPassword(username, password))) {
            res.status(400).json({
                ok: false,
                message: `Invalid credentials`,
            });
            return;
        }
        const user = yield userDB.getUserByUsername(username);
        if (user == null) {
            throw new Error("User not found");
        }
        const authToken = generateAuthToken(user);
        res.json({
            ok: true,
            message: "Login successful",
            result: {
                auth_token: authToken,
                user: { id: user.id, username: user.username },
            },
        });
    }
    catch (error) {
        next(error);
    }
});
function generateAuthToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, process.env["JWT_SECRET"], {
        expiresIn: "1h",
    });
}
