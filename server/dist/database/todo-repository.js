var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "./db.js";
export class TodoRepository {
    constructor(db) {
        this.db = db;
    }
    getTodoUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.todo.findMany({
                where: {
                    user: {
                        username: input.username,
                    },
                },
            });
        });
    }
    createTodo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.todo.create({ data });
        });
    }
    updateTodo(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.todo.update({
                where: {
                    id,
                },
                data: {
                    title: payload.title,
                    description: payload.description,
                    priority: payload.priority,
                    tags: payload.tags,
                    mentions: payload.mentions,
                },
            });
        });
    }
    deleteTodo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.todo.delete({
                where: {
                    id: data.id,
                },
            });
        });
    }
}
export const todoDB = new TodoRepository(db);
