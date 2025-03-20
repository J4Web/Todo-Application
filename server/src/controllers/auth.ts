import type { NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { userDB } from "../database/user-repository.ts";

// Register User
export const registerUser: RequestHandler<any> = async (req, res, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        // Check if username is already taken
        if (await userDB.isUsernameTaken(username)) {
            res.status(400).json({
                ok: false,
                message: "Username already taken",
            });
            return;
        }

        const user = await userDB.createUser({ username, password });

        res.status(201).json({
            ok: true,
            result: {
                user: { id: user.id, username: user.username },
                auth_token: generateAuthToken(user),
            },
            message: "User created successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Login User
export const loginUser: RequestHandler = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        if (!(await userDB.isUserExists({ username }))) {
            res.status(400).json({
                ok: false,
                message: `User is not registered`,
            });

            return;
        }

        if (!(await userDB.isValidPassword(username, password))) {
            res.status(400).json({
                ok: false,
                message: `Invalid credentials`,
            });
            return;
        }

        const user = await userDB.getUserByUsername(username);

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
    } catch (error) {
        next(error);
    }
};

function generateAuthToken(user: { id: string; username: string; password: string }) {
    return jwt.sign({ id: user.id, username: user.username }, process.env["JWT_SECRET"]!, {
        expiresIn: "1h",
    });
}
