import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/server";

const EXCHANGE_RATE = 6.2;
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

type IntervalConfig = {
  months: number;
  discount: number;
  stripeInterval: "month" | "year";
  stripeIntervalCount: number;
};

const INTERVALS: Record<string, IntervalConfig> = {
  monthly: { months: 1, discount: 0, stripeInterval: "month", stripeIntervalCount: 1 },
  quarterly: { months: 3, discount: 0.05, stripeInterval: "month", stripeIntervalCount: 3 },
  annual: { months: 12, discount: 0.10, stripeInterval: "year", stripeIntervalCount: 1 },
};

export async function POST(request: Request) {
  try {
    const { plan, compute, email, userId, interval = "monthly" } = await request.json();

    if (!plan || !PLAN_BASE_AMOUNTS[plan as keyof typeof PLAN_BASE_AMOUNTS]) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    if (!compute || !(compute in COMPUTE_EXTRA_AMOUNTS)) {
      return NextResponse.json({ error: "Compute inválido" }, { status: 400 });
    }

    const intervalConfig = INTERVALS[interval as keyof typeof INTERVALS] ?? INTERVALS.monthly;

    const monthlyAmount =
      PLAN_BASE_AMOUNTS[plan as keyof typeof PLAN_BASE_AMOUNTS] +
      COMPUTE_EXTRA_AMOUNTS[compute as keyof typeof COMPUTE_EXTRA_AMOUNTS];

    const totalAmount = Math.round(monthlyAmount * intervalConfig.months * (1 - intervalConfig.discount));

    const intervalLabel =
      interval === "annual" ? "Anual" : interval === "quarterly" ? "Trimestral" : "Mensal";

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `BCRM ${plan.charAt(0).toUpperCase() + plan.slice(1)} + Compute ${compute} — ${intervalLabel}`,
              description:
                interval === "monthly"
                  ? "Faturamento mensal"
                  : `Cobrado a cada ${intervalConfig.months} meses (desconto de ${Math.round(intervalConfig.discount * 100)}%)`,
            },
            unit_amount: totalAmount,
            recurring: {
              interval: intervalConfig.stripeInterval,
              interval_count: intervalConfig.stripeIntervalCount,
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
        interval,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
