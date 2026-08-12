import { NextResponse } from "next/server";

import { signToken } from "@/lib/auth/jwt";
import { verifyPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/database/prisma-client";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user?.passwordHash) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);

    if (!valid) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    // Check account status
    if (user.status === "grace_period" && user.gracePeriodStart) {
      const now = new Date();
      const gracePeriodEnd = new Date(user.gracePeriodStart);
      gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 90);

      if (now > gracePeriodEnd) {
        // Grace period expired, delete account
        await prisma.user.delete({ where: { id: user.id } });
        return NextResponse.json({ error: "Conta expirada e removida. Crie uma nova conta." }, { status: 403 });
      }
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response: Record<string, unknown> = {
      token,
      user: {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    };

    // If account is pending, indicate activation required
    if (user.status === "pending") {
      response.requiresActivation = true;
      response.redirect = "/activate";
    }

    // If in grace period, add warning
    if (user.status === "grace_period" && user.gracePeriodStart) {
      const daysLeft = Math.ceil(
        (new Date(user.gracePeriodStart).getTime() + 90 * 24 * 60 * 60 * 1000 - Date.now()) / (24 * 60 * 60 * 1000),
      );
      response.warning = `Sua assinatura expirou. Renove em ${daysLeft} dias.`;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
