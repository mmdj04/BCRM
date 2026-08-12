import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import Stripe from "stripe";

import { prisma } from "@/lib/database/prisma-client";
import { sendLicenseKey } from "@/lib/license/email-sender";
import { generateLicenseKey, getExpirationDate } from "@/lib/license/key-generator";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true })
  : (null as unknown as Stripe);

let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
    _supabase = createClient(url, key);
  }
  return _supabase;
}

const EXCHANGE_RATE = 6.2;
const PLAN_MULTIPLIER = 6;
const COMPUTE_MULTIPLIER = 3;

type IntervalConfig = {
  months: number;
  discount: number;
  stripeInterval: "month" | "year";
  stripeIntervalCount: number;
};

const INTERVALS: Record<string, IntervalConfig> = {
  monthly: { months: 1, discount: 0, stripeInterval: "month", stripeIntervalCount: 1 },
  quarterly: { months: 3, discount: 0.05, stripeInterval: "month", stripeIntervalCount: 3 },
  annual: { months: 12, discount: 0.1, stripeInterval: "year", stripeIntervalCount: 1 },
};

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

function getTotalAmount(plan: string, compute: string): number {
  return (PLAN_BASE_AMOUNTS[plan] ?? 0) + (COMPUTE_EXTRA_AMOUNTS[compute] ?? 0);
}

export async function getOrCreateCustomer(userId: string, email: string): Promise<Stripe.Customer> {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { stripeCustomerId: true } });

  if (user?.stripeCustomerId) {
    const customer = await stripe.customers.retrieve(user.stripeCustomerId);
    return customer as Stripe.Customer;
  }

  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  await prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customer.id } });

  return customer;
}

export async function createCheckoutSessionElements(
  userId: string,
  email: string,
  plan: string,
  compute: string,
  interval = "monthly",
  business?: { isBusiness: boolean; companyName?: string; cnpj?: string },
): Promise<{ clientSecret: string | null }> {
  const customer = await getOrCreateCustomer(userId, email);
  const monthlyAmount = getTotalAmount(plan, compute);
  const intervalConfig = INTERVALS[interval] ?? INTERVALS.monthly;
  const totalAmount = Math.round(monthlyAmount * intervalConfig.months * (1 - intervalConfig.discount));
  let intervalLabel: string;
  if (interval === "annual") {
    intervalLabel = "Anual";
  } else if (interval === "quarterly") {
    intervalLabel = "Trimestral";
  } else {
    intervalLabel = "Mensal";
  }

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    ui_mode: "elements",
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: `BCRM ${plan.charAt(0).toUpperCase() + plan.slice(1)} + Compute ${compute} — ${intervalLabel}`,
            metadata: { plan, compute, interval },
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
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    tax_id_collection: { enabled: true },
    billing_address_collection: "required",
    customer_update: {
      name: "auto",
      address: "auto",
    },
    metadata: {
      userId,
      plan,
      compute,
      interval,
      isBusiness: business?.isBusiness ? "true" : "false",
      companyName: business?.companyName ?? "",
      cnpj: business?.cnpj ?? "",
    },
  });

  return { clientSecret: session.client_secret };
}

export async function createCheckoutSession(
  userId: string,
  email: string,
  plan: string,
  compute: string,
  interval = "monthly",
  business?: { isBusiness: boolean; companyName?: string; cnpj?: string },
): Promise<{ url: string | null }> {
  const customer = await getOrCreateCustomer(userId, email);
  const monthlyAmount = getTotalAmount(plan, compute);
  const intervalConfig = INTERVALS[interval] ?? INTERVALS.monthly;
  const totalAmount = Math.round(monthlyAmount * intervalConfig.months * (1 - intervalConfig.discount));
  let intervalLabel: string;
  if (interval === "annual") {
    intervalLabel = "Anual";
  } else if (interval === "quarterly") {
    intervalLabel = "Trimestral";
  } else {
    intervalLabel = "Mensal";
  }

  const customFields: Stripe.Checkout.SessionCreateParams.CustomField[] = [];

  if (business?.isBusiness) {
    if (business.companyName) {
      customFields.push({
        key: "company_name",
        label: { type: "custom" as const, custom: "Nome da Empresa" },
        type: "text",
        optional: false,
      });
    }
    if (business.cnpj) {
      customFields.push({
        key: "cnpj",
        label: { type: "custom" as const, custom: "CNPJ" },
        type: "text",
        optional: false,
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "brl",
          product: undefined,
          product_data: {
            name: `BCRM ${plan.charAt(0).toUpperCase() + plan.slice(1)} + Compute ${compute} — ${intervalLabel}`,
            metadata: { plan, compute, interval },
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
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    metadata: {
      userId,
      plan,
      compute,
      interval,
      isBusiness: business?.isBusiness ? "true" : "false",
      companyName: business?.companyName ?? "",
      cnpj: business?.cnpj ?? "",
    },
    ...(customFields.length > 0 ? { custom_fields: customFields } : {}),
  });

  return { url: session.url };
}

export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      const compute = session.metadata?.compute;
      const interval = session.metadata?.interval ?? "monthly";
      const isBusiness = session.metadata?.isBusiness === "true";
      const companyName = session.metadata?.companyName;
      const cnpj = session.metadata?.cnpj;

      if (userId && plan) {
        const updateData: Record<string, unknown> = {
          plan,
          compute: compute ?? "medium",
          plan_interval: interval,
          subscription_status: "active",
        };

        if (isBusiness) {
          updateData.is_business = true;
          if (companyName) updateData.company_name = companyName;
          if (cnpj) updateData.cnpj = cnpj;
        }

        // Update user in Supabase
        await getSupabase().from("users").update(updateData).eq("id", userId);

        // Generate license key and send email
        try {
          const key = generateLicenseKey();
          const expiresAt = getExpirationDate(interval);

          // Get user email from Supabase
          const { data: userData } = await getSupabase().from("users").select("email, name").eq("id", userId).single();

          if (userData) {
            // Store license key in Supabase (we'll use raw SQL since Prisma is for local SQLite)
            await getSupabase().from("license_keys").insert({
              key,
              user_id: userId,
              plan,
              interval,
              expires_at: expiresAt.toISOString(),
            });

            // Send email with license key
            await sendLicenseKey({
              email: userData.email,
              name: userData.name || "Usuário",
              key,
              plan,
              interval,
            });
          }
        } catch (error) {
          console.error("Failed to generate license key:", error);
        }
      }
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      const { data: user } = await getSupabase()
        .from("users")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (user) {
        await getSupabase()
          .from("payments")
          .insert({
            user_id: user.id,
            stripe_payment_id: invoice.id,
            stripe_invoice_id: invoice.id,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: "succeeded",
            description: invoice.description ?? "Assinatura BCRM",
          });

        await getSupabase()
          .from("users")
          .update({
            subscription_status: "active",
          })
          .eq("id", user.id);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      const { data: user } = await getSupabase()
        .from("users")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (user) {
        await getSupabase()
          .from("payments")
          .insert({
            user_id: user.id,
            stripe_payment_id: invoice.id,
            stripe_invoice_id: invoice.id,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: "failed",
            description: invoice.description ?? "Assinatura BCRM",
          });

        // Start grace period
        await getSupabase()
          .from("users")
          .update({
            subscription_status: "past_due",
          })
          .eq("id", user.id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const { data: user } = await getSupabase()
        .from("users")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (user) {
        await getSupabase()
          .from("users")
          .update({
            subscription_status: "free",
            plan: "free",
            subscription_id: null,
            cancel_at_period_end: false,
          })
          .eq("id", user.id);
      }
      break;
    }
  }
}
