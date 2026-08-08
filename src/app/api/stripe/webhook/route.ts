import { headers } from "next/headers";
import { NextResponse } from "next/server";

import type Stripe from "stripe";

import { stripe } from "@/lib/stripe/server";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // biome-ignore lint/style/noNonNullAssertion: STRIPE_WEBHOOK_SECRET must be set for webhooks to work
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed:", session.id);
        // TODO: Update user subscription status in Supabase
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription updated:", subscription.id);
        // TODO: Update subscription status in Supabase
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log("Subscription deleted:", subscription.id);
        // TODO: Downgrade user to free plan in Supabase
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment succeeded:", invoice.id);
        // TODO: Record payment in Supabase
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment failed:", invoice.id);
        // TODO: Notify user of failed payment
        break;
      }
      case "setup_intent.created":
      case "setup_intent.succeeded":
      case "setup_intent.setup_failed": {
        const setupIntent = event.data.object as Stripe.SetupIntent;
        console.log("Setup intent:", event.type, setupIntent.id);
        // TODO: Handle payment method setup
        break;
      }
      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
