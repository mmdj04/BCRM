-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "jobTitle" TEXT,
    "website" TEXT,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "plan" TEXT,
    "planInterval" TEXT,
    "compute" TEXT,
    "pitr" TEXT,
    "subscriptionStatus" TEXT,
    "currentPeriodEnd" DATETIME,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "planExpiresAt" DATETIME,
    "onboardedAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "gracePeriodStart" DATETIME,
    "setupCompleted" BOOLEAN NOT NULL DEFAULT false,
    "companyName" TEXT,
    "cnpj" TEXT,
    "isBusiness" BOOLEAN NOT NULL DEFAULT false,
    "passwordHash" TEXT,
    "lastActiveAt" DATETIME,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "supabaseId" TEXT,
    "isDirty" BOOLEAN NOT NULL DEFAULT false,
    "syncVersion" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" DATETIME
);
INSERT INTO "new_User" ("avatarUrl", "company", "createdAt", "deletedAt", "email", "gracePeriodStart", "id", "isDirty", "jobTitle", "lastActiveAt", "name", "onboardedAt", "passwordHash", "phone", "plan", "planExpiresAt", "role", "setupCompleted", "status", "stripeCustomerId", "stripeSubscriptionId", "supabaseId", "syncVersion", "updatedAt", "website") SELECT "avatarUrl", "company", "createdAt", "deletedAt", "email", "gracePeriodStart", "id", "isDirty", "jobTitle", "lastActiveAt", "name", "onboardedAt", "passwordHash", "phone", "plan", "planExpiresAt", "role", "setupCompleted", "status", "stripeCustomerId", "stripeSubscriptionId", "supabaseId", "syncVersion", "updatedAt", "website" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_supabaseId_key" ON "User"("supabaseId");
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "User_supabaseId_idx" ON "User"("supabaseId");
CREATE INDEX "User_isDirty_idx" ON "User"("isDirty");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
