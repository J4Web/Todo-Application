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
  async updateTodo(id: string, payload: any) {
    return await this.db.todo.update({
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
  }

  async deleteTodo(data: any) {
    return await this.db.todo.delete({
      where: {
        id: data.id,
      },
    });
  }
}

export const todoDB = new TodoRepository(db);
