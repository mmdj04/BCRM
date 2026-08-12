import { execSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

export function runMigrations() {
  const dbPath = path.join(process.env.HOME || process.env.USERPROFILE || "", ".bcrm");

  if (!existsSync(dbPath)) {
    mkdirSync(dbPath, { recursive: true });
  }

  try {
    execSync("npx prisma migrate deploy", {
      cwd: path.resolve(process.cwd()),
      stdio: "pipe",
    });
    console.log("[DB] Migrations applied successfully");
  } catch (error) {
    console.error("[DB] Migration failed:", error);
  }
}
