import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/server";

const PLAN_PRICES: Record<string, number> = {
  starter: 89990,
  pro: 229990,
  team: 899990,
};

const COMPUTE_PRICES: Record<string, number> = {
  micro: 9500,
  small: 13500,
  medium: 49500,
  large: 85300,
  xlarge: 147000,
  "2xlarge": 273000,
  "4xlarge": 525000,
  "8xlarge": 1008000,
  "12xlarge": 1512000,
  "16xlarge": 2016000,
};

export async function POST(request: Request) {
  try {
    const { plan, compute, email, userId } = await request.json();

    if (!plan || !PLAN_PRICES[plan as keyof typeof PLAN_PRICES]) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    if (!compute || !(compute in COMPUTE_PRICES)) {
      return NextResponse.json({ error: "Compute inválido" }, { status: 400 });
    }

    const priceAmount =
      PLAN_PRICES[plan as keyof typeof PLAN_PRICES] + COMPUTE_PRICES[compute as keyof typeof COMPUTE_PRICES];

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `BCRM ${plan.charAt(0).toUpperCase() + plan.slice(1)} + Compute ${compute}`,
              description: "Faturamento mensal",
            },
            unit_amount: priceAmount,
            recurring: {
              interval: "month",
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
        compute,
        interval: "monthly",
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
