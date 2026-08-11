import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn("DATABASE_URL not set, Prisma client unavailable");
    return undefined;
  }

  try {
    const { PrismaPg } = require("@prisma/adapter-pg");
    const adapter = new PrismaPg({ connectionString: url });
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  } catch (err) {
    console.error("Failed to create Prisma client with adapter:", err);
    return undefined;
  }
}

// Only create client when DATABASE_URL exists (not during build)
const client = process.env.DATABASE_URL ? createPrismaClient() : undefined;

export const prisma = globalForPrisma.prisma ?? client;

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
