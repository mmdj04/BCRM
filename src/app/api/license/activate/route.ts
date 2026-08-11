import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma-client";
import { verifyToken, getTokenFromRequest } from "@/lib/auth/jwt";

const DEMO_KEY = "BCRM-DEMO-DEMO-DEMO-DEMO";

export async function POST(request: Request) {
  try {
    const { key } = await request.json();

    if (!key || typeof key !== "string") {
      return NextResponse.json({ error: "Chave é obrigatória" }, { status: 400 });
    }

    const cleanKey = key.trim().toUpperCase();

    // Get current user from token
    const token = getTokenFromRequest(request);
    let userId: string | null = null;

    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        userId = payload.userId;
      }
    }

    // Handle demo key - activate directly without database lookup
    if (cleanKey === DEMO_KEY) {
      if (!userId) {
        return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          status: "active",
          plan: "pro",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Conta demo ativada com sucesso",
        plan: "pro",
      });
    }

    // Find the license key
    const license = await prisma.licenseKey.findUnique({
      where: { key: cleanKey },
    });

    if (!license) {
      return NextResponse.json({ error: "Chave inválida" }, { status: 404 });
    }

    // Check if already used
    if (license.usedAt) {
      return NextResponse.json({ error: "Chave já utilizada" }, { status: 400 });
    }

    // Check if expired
    if (new Date() > license.expiresAt) {
      return NextResponse.json({ error: "Chave expirada" }, { status: 400 });
    }

    if (!userId) {
      userId = license.userId;
    }

    // Activate user account
    await prisma.user.update({
      where: { id: userId },
      data: {
        status: "active",
        plan: license.plan,
      },
    });

    // Mark license as used
    await prisma.licenseKey.update({
      where: { id: license.id },
      data: { usedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: "Conta ativada com sucesso",
      plan: license.plan,
    });
  } catch (error) {
    console.error("License activation error:", error);
    return NextResponse.json({ error: "Erro ao ativar licença" }, { status: 500 });
  }
}
