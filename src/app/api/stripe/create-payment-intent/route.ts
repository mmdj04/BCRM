import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/server";

const PLAN_PRICES = {
  starter: { monthly: 78990, yearly: 947880 },
  pro: { monthly: 188990, yearly: 2267880 },
  team: { monthly: 798990, yearly: 9587880 },
} as const;

export async function POST(request: Request) {
  try {
    const { plan, interval = "monthly" } = await request.json();

    if (!plan || !PLAN_PRICES[plan as keyof typeof PLAN_PRICES]) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    const priceAmount = PLAN_PRICES[plan as keyof typeof PLAN_PRICES][interval as "monthly" | "yearly"];

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceAmount,
      currency: "brl",
      automatic_payment_methods: { enabled: true },
      metadata: { plan, interval },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
