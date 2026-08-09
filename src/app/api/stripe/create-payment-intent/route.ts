import { NextResponse } from "next/server";

import { createCheckoutSession } from "@/lib/stripe/billing";

export async function POST(request: Request) {
  try {
    const { plan, interval = "monthly", userId, email } = await request.json();

    if (!plan || !["starter", "pro", "team"].includes(plan)) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    if (!userId || !email) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const { url } = await createCheckoutSession(userId, email, plan, interval);

    if (!url) {
      return NextResponse.json({ error: "Não foi possível criar a sessão de checkout" }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
