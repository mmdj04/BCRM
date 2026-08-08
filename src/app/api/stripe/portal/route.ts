import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/server";

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json({ error: "Customer ID required" }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating portal session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
