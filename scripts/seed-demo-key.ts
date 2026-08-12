import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set. Please set it before running this script.");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const DEMO_KEY = "BCRM-DEMO-DEMO-DEMO-DEMO";
const DEMO_EMAIL = "admin@bcrm.com";

async function main() {
  console.log("Seeding demo license key...");

  // Find the demo user
  const demoUser = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (!demoUser) {
    console.error(`Demo user not found: ${DEMO_EMAIL}`);
    console.log("Please register the demo user first, then run this script.");
    process.exit(1);
  }

  // Check if demo key already exists
  const existingKey = await prisma.licenseKey.findUnique({
    where: { key: DEMO_KEY },
  });

  if (existingKey) {
    console.log("Demo license key already exists. Updating user reference...");

    // Update the key to point to the current demo user
    await prisma.licenseKey.update({
      where: { id: existingKey.id },
      data: { userId: demoUser.id },
    });

    console.log("Demo license key updated successfully.");
    return;
  }

  // Create demo license key
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 100); // 100 years from now

  await prisma.licenseKey.create({
    data: {
      key: DEMO_KEY,
      userId: demoUser.id,
      plan: "pro",
      interval: "annual",
      expiresAt,
    },
  });

  console.log("Demo license key created successfully:");
  console.log(`  Key: ${DEMO_KEY}`);
  console.log(`  User: ${DEMO_EMAIL} (${demoUser.id})`);
  console.log(`  Plan: pro`);
  console.log(`  Expires: ${expiresAt.toISOString()}`);
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
