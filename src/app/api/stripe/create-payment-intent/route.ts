import { NextResponse } from "next/server";

import { createCheckoutSessionElements } from "@/lib/stripe/billing";

export async function POST(request: Request) {
  try {
    const {
      plan,
      interval = "monthly",
      userId,
      email,
      isBusiness,
      companyName,
      cnpj,
    } = await request.json();

    if (!plan || !["starter", "pro", "team"].includes(plan)) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    if (!userId || !email) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const { clientSecret } = await createCheckoutSessionElements(userId, email, plan, interval, {
      isBusiness: !!isBusiness,
      companyName: companyName || undefined,
      cnpj: cnpj || undefined,
    });

    if (!clientSecret) {
      return NextResponse.json({ error: "Não foi possível criar a sessão de pagamento" }, { status: 500 });
    }

    return NextResponse.json({ clientSecret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
