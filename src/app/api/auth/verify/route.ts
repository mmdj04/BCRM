import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token é obrigatório" }, { status: 400 });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
    }

    return NextResponse.json({ user: payload });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Erro ao verificar token" }, { status: 500 });
  }
}
