import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // During build time, DATABASE_URL may not be available
  if (!process.env.DATABASE_URL) {
    // Return a dummy client - will be replaced at runtime
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  }

  try {
    const { PrismaPg } = require("@prisma/adapter-pg");
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {} as any;
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
