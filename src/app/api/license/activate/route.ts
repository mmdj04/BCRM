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

    // Get current user from token
    const token = getTokenFromRequest(request);
    let userId = license.userId;

    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        userId = payload.userId;
      }
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
