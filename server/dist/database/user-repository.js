var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import { db } from "./db.js";
export class UserRepository {
    constructor(db) {
        this.db = db;
    }
    encodePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.hash(password, 10);
        });
    }
    isPasswordMatching(encoded, raw) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(raw, encoded);
        });
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.user.create({
                data: {
                    username: input.username,
                    password: yield this.encodePassword(input.password),
                },
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.user.findUnique({
                where: { id },
            });
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.user.findUnique({
                where: { username },
            });
        });
    }
    isUsernameTaken(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.user.findUnique({
                where: { username },
            });
            return !!user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.user.findMany({
                select: { id: true, username: true },
            });
        });
    }
    isValidPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByUsername(username);
            if (!user)
                return false;
            return this.isPasswordMatching(user.password, password);
        });
    }
    isUserExists(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.user.findUnique({
                where: value,
            });
            return !!user;
        });
    }
}
export const userDB = new UserRepository(db);
