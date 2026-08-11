import { NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "@/lib/auth/jwt";
import { syncEngine } from "@/lib/sync/engine";

export async function POST(request: Request) {
  try {
    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const result = await syncEngine.sync(payload.userId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Erro ao sincronizar" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: syncEngine.currentStatus,
    message: "Use POST to trigger sync",
  });
}
