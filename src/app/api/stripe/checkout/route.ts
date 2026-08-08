import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/server";

const PLAN_PRICES = {
  starter: { monthly: 78990, yearly: 947880 },
  pro: { monthly: 188990, yearly: 2267880 },
  team: { monthly: 798990, yearly: 9587880 },
} as const;

export async function POST(request: Request) {
  try {
    const { plan, interval = "monthly", email, userId } = await request.json();

    if (!plan || !PLAN_PRICES[plan as keyof typeof PLAN_PRICES]) {
      return NextResponse.json({ error: "Plano invalido" }, { status: 400 });
    }

    const priceAmount = PLAN_PRICES[plan as keyof typeof PLAN_PRICES][interval as "monthly" | "yearly"];

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `BCRM ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
              description: interval === "yearly" ? "Faturamento anual" : "Faturamento mensal",
            },
            unit_amount: priceAmount,
            recurring: {
              interval: interval as "month" | "year",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: {
        userId,
        plan,
        interval,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
