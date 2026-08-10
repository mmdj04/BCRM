import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/server";

const EXCHANGE_RATE = 6.2;
const STRIPE_FEE_RATE = 0.05;
const COMPUTE_CREDIT_USD = 10;

function smartPrice(totalCostBRL: number): number {
  let multiplier: number;
  if (totalCostBRL <= 5000) {
    multiplier = 5;
  } else if (totalCostBRL >= 50000) {
    multiplier = 3.5;
  } else {
    multiplier = 5 - ((totalCostBRL - 5000) / 45000) * 1.5;
  }
  return Math.round(((totalCostBRL * multiplier) / (1 - STRIPE_FEE_RATE)) * 100);
}

function planAmount(supabaseUSD: number): number {
  return smartPrice(supabaseUSD * EXCHANGE_RATE);
}

function computeExtraAmount(computeUSD: number): number {
  const effectiveUSD = Math.max(0, computeUSD - COMPUTE_CREDIT_USD);
  if (effectiveUSD <= 0) return 0;
  return smartPrice(effectiveUSD * EXCHANGE_RATE);
}

const PLAN_BASE_AMOUNTS: Record<string, number> = {
  pro: planAmount(25 - 10),
  enterprise: planAmount(599 - 10),
};

const COMPUTE_EXTRA_AMOUNTS: Record<string, number> = {
  micro: computeExtraAmount(10),
  small: computeExtraAmount(15),
  medium: computeExtraAmount(60),
  large: computeExtraAmount(110),
  xlarge: computeExtraAmount(210),
  "2xlarge": computeExtraAmount(410),
  "4xlarge": computeExtraAmount(960),
  "8xlarge": computeExtraAmount(1870),
  "12xlarge": computeExtraAmount(2800),
  "16xlarge": computeExtraAmount(3730),
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
