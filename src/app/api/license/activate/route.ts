import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma-client";
import { verifyToken, getTokenFromRequest } from "@/lib/auth/jwt";

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

    if (!userId) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    // Find the license key
    const license = await prisma.licenseKey.findUnique({
      where: { key: cleanKey },
    });

    if (!license) {
      return NextResponse.json({ error: "Chave inválida" }, { status: 404 });
    }

    // Check if already used by a different user
    if (license.usedAt && license.userId !== userId) {
      return NextResponse.json({ error: "Chave já utilizada por outro usuário" }, { status: 400 });
    }

    // Check if expired
    if (new Date() > license.expiresAt) {
      return NextResponse.json({ error: "Chave expirada" }, { status: 400 });
    }

    // Check if this key belongs to this user (demo key is user-specific)
    if (license.userId !== userId) {
      return NextResponse.json({ error: "Chave não pertence a esta conta" }, { status: 400 });
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
