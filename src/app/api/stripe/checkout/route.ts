import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/server";

const EXCHANGE_RATE = 6.2;
const STRIPE_FEE_RATE = 0.05;
const PLAN_MULTIPLIER = 6;
const COMPUTE_MULTIPLIER = 3;

function planAmount(supabaseUSD: number): number {
  return Math.round(supabaseUSD * EXCHANGE_RATE * PLAN_MULTIPLIER);
}

function computeAmount(supabaseUSD: number): number {
  return Math.round(supabaseUSD * EXCHANGE_RATE * COMPUTE_MULTIPLIER);
}

const PLAN_BASE_AMOUNTS: Record<string, number> = {
  pro: planAmount(25),
  enterprise: planAmount(599),
};

const COMPUTE_EXTRA_AMOUNTS: Record<string, number> = {
  micro: computeAmount(10),
  small: computeAmount(15),
  medium: computeAmount(60),
  large: computeAmount(110),
  xlarge: computeAmount(210),
  "2xlarge": computeAmount(410),
  "4xlarge": computeAmount(960),
  "8xlarge": computeAmount(1870),
  "12xlarge": computeAmount(2800),
  "16xlarge": computeAmount(3730),
};

export async function POST(request: Request) {
  try {
    const { plan, compute, email, userId } = await request.json();

    if (!plan || !PLAN_BASE_AMOUNTS[plan as keyof typeof PLAN_BASE_AMOUNTS]) {
      return NextResponse.json({ error: "Plano invalido" }, { status: 400 });
    }

    if (!compute || !(compute in COMPUTE_EXTRA_AMOUNTS)) {
      return NextResponse.json({ error: "Compute invalido" }, { status: 400 });
    }

    const priceAmount =
      PLAN_BASE_AMOUNTS[plan as keyof typeof PLAN_BASE_AMOUNTS] +
      COMPUTE_EXTRA_AMOUNTS[compute as keyof typeof COMPUTE_EXTRA_AMOUNTS];

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
