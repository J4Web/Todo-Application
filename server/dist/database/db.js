import { PrismaClient } from "@prisma/client";
export const db = new PrismaClient({
    datasourceUrl: process.env["POSTGRES_CONN_STR"],
    log: ["query", "info", "warn", "error"],
});
