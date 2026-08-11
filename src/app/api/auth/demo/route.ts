import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma-client";
import { hashPassword } from "@/lib/auth/password";
import { signToken } from "@/lib/auth/jwt";

const DEMO_KEY = "BCRM-DEMO-DEMO-DEMO-DEMO";
const DEMO_EMAIL = "admin@bcrm.com";
const DEMO_PASSWORD = "10092004m";

export async function POST() {
  try {
    // Find or create demo user
    let user = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });

    if (!user) {
      const passwordHash = await hashPassword(DEMO_PASSWORD);
      user = await prisma.user.create({
        data: {
          email: DEMO_EMAIL,
          name: "Matheus Moraes",
          passwordHash,
          role: "admin",
          status: "pending",
        },
      });
    }

    // Find or create demo license key
    let license = await prisma.licenseKey.findUnique({ where: { key: DEMO_KEY } });

    if (!license) {
      const expiresAt = new Date();
      expiresAt.setFullYear(expiresAt.getFullYear() + 100);

      license = await prisma.licenseKey.create({
        data: {
          key: DEMO_KEY,
          userId: user.id,
          plan: "pro",
          interval: "annual",
          expiresAt,
        },
      });
    } else if (license.userId !== user.id) {
      // Update license to point to current demo user
      await prisma.licenseKey.update({
        where: { id: license.id },
        data: { userId: user.id },
      });
    }

    // Generate JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json({
      token,
      user: {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
      },
      requiresActivation: true,
      redirect: "/activate",
    });
  } catch (error) {
    console.error("Demo login error:", error);
    return NextResponse.json({ error: "Erro ao configurar conta demo" }, { status: 500 });
  }
}
