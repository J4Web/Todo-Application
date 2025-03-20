import type { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { db } from "./db.ts";

export interface UserCreateInput {
    username: string;
    password: string;
}

export class UserRepository {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    private async encodePassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    private async isPasswordMatching(encoded: string, raw: string) {
        console.log(raw, encoded);
        return await bcrypt.compare(raw, encoded);
    }

    async createUser(input: UserCreateInput) {
        return await this.db.user.create({
            data: {
                username: input.username,
                password: await this.encodePassword(input.password),
            },
        });
    }

    async getUserById(id: string) {
        return await this.db.user.findUnique({
            where: { id },
        });
    }

    async getUserByUsername(username: string) {
        return await this.db.user.findUnique({
            where: { username },
        });
    }

    async isUsernameTaken(username: string) {
        const user = await this.db.user.findUnique({
            where: { username },
        });

        return !!user;
    }

    async getAllUsers() {
        return await this.db.user.findMany({
            select: { id: true, username: true },
        });
    }

    async isValidPassword(username: string, password: string) {
        const user = await this.getUserByUsername(username);
        if (!user) return false;

        return this.isPasswordMatching(user.password, password);
    }

    async isUserExists(value: { id: string } | { username: string }) {
        const user = await this.db.user.findUnique({
            where: value,
        });

        return !!user;
    }
}

export const userDB = new UserRepository(db);
