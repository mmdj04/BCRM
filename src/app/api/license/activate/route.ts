import { NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "@/lib/auth/jwt";

const DEMO_KEY = "BCRM-DEMO-DEMO-DEMO-DEMO";
const DEMO_USER_ID = "demo-user-001";

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

    // Handle demo key - no database needed
    if (cleanKey === DEMO_KEY) {
      // Only demo user can use demo key
      if (userId !== DEMO_USER_ID) {
        return NextResponse.json({ error: "Chave não pertence a esta conta" }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        message: "Conta demo ativada com sucesso",
        plan: "pro",
      });
    }

    // For real keys, we need the database
    // Try to import prisma only when needed
    try {
      const { getPrisma } = await import("@/lib/database/prisma-client");
      const prisma = getPrisma();

      const license = await prisma.licenseKey.findUnique({
        where: { key: cleanKey },
      });

      if (!license) {
        return NextResponse.json({ error: "Chave inválida" }, { status: 404 });
      }

      if (license.usedAt && license.userId !== userId) {
        return NextResponse.json({ error: "Chave já utilizada por outro usuário" }, { status: 400 });
      }

      if (new Date() > license.expiresAt) {
        return NextResponse.json({ error: "Chave expirada" }, { status: 400 });
      }

      if (license.userId !== userId) {
        return NextResponse.json({ error: "Chave não pertence a esta conta" }, { status: 400 });
      }

      await prisma.user.update({
        where: { id: userId },
        data: { status: "active", plan: license.plan },
      });

      await prisma.licenseKey.update({
        where: { id: license.id },
        data: { usedAt: new Date() },
      });

      return NextResponse.json({
        success: true,
        message: "Conta ativada com sucesso",
        plan: license.plan,
      });
    } catch {
      return NextResponse.json({ error: "Erro ao acessar banco de dados" }, { status: 500 });
    }
  } catch (error) {
    console.error("License activation error:", error);
    return NextResponse.json({ error: "Erro ao ativar licença" }, { status: 500 });
  }
}
