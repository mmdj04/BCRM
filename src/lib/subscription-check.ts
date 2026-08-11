import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export type SubscriptionStatus = {
	isOnline: boolean;
	isActive: boolean;
	plan: string;
	subscriptionStatus: string;
	message?: string;
};

export async function checkInternet(): Promise<boolean> {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);

		await fetch(`${supabaseUrl}/rest/v1/`, {
			method: "HEAD",
			signal: controller.signal,
			cache: "no-store",
		});

		clearTimeout(timeoutId);
		return true;
	} catch {
		return false;
	}
}

export async function checkSubscription(userId: string): Promise<SubscriptionStatus> {
	const isOnline = await checkInternet();

	if (!isOnline) {
		return {
			isOnline: false,
			isActive: false,
			plan: "free",
			subscriptionStatus: "free",
			message:
				"Você precisa de internet para usar o BCRM. Conecte-se à internet e tente novamente.",
		};
	}

	if (!supabaseUrl || !supabaseAnonKey) {
		return {
			isOnline: true,
			isActive: true,
			plan: "pro",
			subscriptionStatus: "active",
		};
	}

	try {
		const supabase = createClient(supabaseUrl, supabaseAnonKey);

		const { data: user, error } = await supabase
			.from("users")
			.select("plan, subscription_status")
			.eq("id", userId)
			.single();

		if (error || !user) {
			return {
				isOnline: true,
				isActive: true,
				plan: "free",
				subscriptionStatus: "active",
			};
		}

		const isActive =
			user.subscription_status === "active" || user.subscription_status === "trialing";

		return {
			isOnline: true,
			isActive,
			plan: user.plan || "free",
			subscriptionStatus: user.subscription_status || "free",
			message: isActive
				? undefined
				: "Sua assinatura está expirada. Renove para continuar usando o BCRM.",
		};
	} catch {
		return {
			isOnline: true,
			isActive: true,
			plan: "free",
			subscriptionStatus: "active",
		};
	}
}

export async function checkGracePeriod(userId: string): Promise<{
  inGracePeriod: boolean;
  daysLeft: number;
  expired: boolean;
}> {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: user } = await supabase
      .from("users")
      .select("subscription_status, updated_at")
      .eq("id", userId)
      .single();

    if (!user || user.subscription_status !== "past_due") {
      return { inGracePeriod: false, daysLeft: 0, expired: false };
    }

    // Calculate grace period (90 days from last update)
    const lastUpdate = new Date(user.updated_at);
    const gracePeriodEnd = new Date(lastUpdate);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 90);

    const now = new Date();
    const daysLeft = Math.ceil((gracePeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      inGracePeriod: true,
      daysLeft: Math.max(0, daysLeft),
      expired: daysLeft <= 0,
    };
  } catch {
    return { inGracePeriod: false, daysLeft: 0, expired: false };
  }
}
