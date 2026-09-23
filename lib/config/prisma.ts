import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  authPrisma: PrismaClient | undefined
}

export const authPrisma =
  globalForPrisma.authPrisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.authPrisma = authPrisma
}
