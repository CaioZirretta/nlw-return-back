import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    // Qualquer query aparecerá no terminal
    log: ['query']
});