import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth/jwt";

// Demo account - hardcoded, no database needed
const DEMO_USER = {
  id: "demo-user-001",
  email: "admin@bcrm.com",
  name: "Matheus Moraes",
  role: "admin",
  plan: "pro",
};

export async function POST() {
  try {
    // Generate JWT token directly - no database needed
    const token = await signToken({
      userId: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      role: DEMO_USER.role,
    });

    return NextResponse.json({
      token,
      user: {
        userId: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name,
        role: DEMO_USER.role,
        status: "active",
      },
      requiresActivation: true,
      redirect: "/activate",
    });
  } catch (error) {
    console.error("Demo login error:", error);
    return NextResponse.json({ error: "Erro ao configurar conta demo" }, { status: 500 });
  }
}
