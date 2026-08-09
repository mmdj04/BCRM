import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.SUPABASE_SECRET_KEY ?? "");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { typescript: true });

const PLAN_AMOUNTS: Record<string, number> = {
  starter: 89990, // R$ 899,90
  pro: 229990, // R$ 2.299,90
  team: 899990, // R$ 8.999,90
};

export async function getOrCreateCustomer(userId: string, email: string): Promise<Stripe.Customer> {
  const { data: user } = await supabase.from("users").select("stripe_customer_id").eq("id", userId).single();

  if (user?.stripe_customer_id) {
    const customer = await stripe.customers.retrieve(user.stripe_customer_id);
    return customer as Stripe.Customer;
  }

  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  await supabase.from("users").update({ stripe_customer_id: customer.id }).eq("id", userId);

  return customer;
}

export async function createCheckoutSessionElements(
  userId: string,
  email: string,
  plan: string,
  business?: { isBusiness: boolean; companyName?: string; cnpj?: string },
): Promise<{ clientSecret: string | null }> {
  const customer = await getOrCreateCustomer(userId, email);

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    ui_mode: "elements",
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: `BCRM ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
            metadata: { plan },
          },
          unit_amount: PLAN_AMOUNTS[plan] ?? PLAN_AMOUNTS.pro,
          recurring: { interval: "month" },
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
      interval: "monthly",
      isBusiness: business?.isBusiness ? "true" : "false",
      companyName: business?.companyName || "",
      cnpj: business?.cnpj || "",
    },
  });

  return { clientSecret: session.client_secret };
}

export async function createCheckoutSession(
  userId: string,
  email: string,
  plan: string,
  business?: { isBusiness: boolean; companyName?: string; cnpj?: string },
): Promise<{ url: string | null }> {
  const customer = await getOrCreateCustomer(userId, email);

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
            name: `BCRM ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
            metadata: { plan },
          },
          unit_amount: PLAN_AMOUNTS[plan] ?? PLAN_AMOUNTS.pro,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    metadata: {
      userId,
      plan,
      interval: "monthly",
      isBusiness: business?.isBusiness ? "true" : "false",
      companyName: business?.companyName || "",
      cnpj: business?.cnpj || "",
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
      const interval = session.metadata?.interval;
      const isBusiness = session.metadata?.isBusiness === "true";
      const companyName = session.metadata?.companyName;
      const cnpj = session.metadata?.cnpj;

      if (userId && plan) {
        const updateData: Record<string, unknown> = {
          plan,
          plan_interval: interval ?? "monthly",
          subscription_status: "active",
        };

        if (isBusiness) {
          updateData.is_business = true;
          if (companyName) updateData.company_name = companyName;
          if (cnpj) updateData.cnpj = cnpj;
        }

        await supabase.from("users").update(updateData).eq("id", userId);
      }
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      const { data: user } = await supabase.from("users").select("id").eq("stripe_customer_id", customerId).single();

      if (user) {
        await supabase.from("payments").insert({
          user_id: user.id,
          stripe_payment_id: invoice.id,
          stripe_invoice_id: invoice.id,
          amount: invoice.amount_paid,
          currency: invoice.currency,
          status: "succeeded",
          description: invoice.description ?? "Assinatura BCRM",
        });

        await supabase
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

      const { data: user } = await supabase.from("users").select("id").eq("stripe_customer_id", customerId).single();

      if (user) {
        await supabase.from("payments").insert({
          user_id: user.id,
          stripe_payment_id: invoice.id,
          stripe_invoice_id: invoice.id,
          amount: invoice.amount_paid,
          currency: invoice.currency,
          status: "failed",
          description: invoice.description ?? "Assinatura BCRM",
        });

        await supabase.from("users").update({ subscription_status: "past_due" }).eq("id", user.id);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const { data: user } = await supabase.from("users").select("id").eq("stripe_customer_id", customerId).single();

      if (user) {
        await supabase
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
