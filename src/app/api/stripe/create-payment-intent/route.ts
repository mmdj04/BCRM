import { NextResponse } from "next/server";

import { createCheckoutSessionElements } from "@/lib/stripe/billing";

const VALID_COMPUTE = [
  "micro",
  "small",
  "medium",
  "large",
  "xlarge",
  "2xlarge",
  "4xlarge",
  "8xlarge",
  "12xlarge",
  "16xlarge",
];

export async function POST(request: Request) {
  try {
    const { plan, compute, userId, email, interval, isBusiness, companyName, cnpj } = await request.json();

    if (!plan || !["pro", "enterprise"].includes(plan)) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    if (!compute || !VALID_COMPUTE.includes(compute)) {
      return NextResponse.json({ error: "Compute inválido" }, { status: 400 });
    }

    if (!userId || !email) {
      return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
    }

    const validInterval = ["monthly", "quarterly", "annual"].includes(interval) ? interval : "monthly";

    const { clientSecret } = await createCheckoutSessionElements(userId, email, plan, compute, validInterval, {
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
