import type { PrismaClient } from "@prisma/client";
import { db } from "./db.ts";
export interface UserGetTodo {
  username: string;
}

export class TodoRepository {
  private readonly db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async getTodoUser(input: UserGetTodo) {
    return await this.db.todo.findMany({
      where: {
        user: {
          username: input.username,
        },
      },
    });
  }

  async createTodo(data: any) {
    return await this.db.todo.create({ data });
  }

  async updateTodo() {
    return await this.db.todo.update({
      where: {
        id: 1,
      },
      data: {
        completed: true,
      },
    });
  }

  async deleteTodo() {
    return await this.db.todo.delete({
      where: {
        id: 1,
      },
    });
  }
}

export const todoDB = new TodoRepository(db);
