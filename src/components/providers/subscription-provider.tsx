"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { checkSubscription, type SubscriptionStatus } from "@/lib/subscription-check";
import { AccessBlocked } from "@/components/access-blocked";

type SubscriptionContextValue = {
	status: SubscriptionStatus | null;
	loading: boolean;
	isBlocked: boolean;
	recheck: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextValue>({
	status: null,
	loading: true,
	isBlocked: false,
	recheck: async () => {},
});

export function useSubscription() {
	return useContext(SubscriptionContext);
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
	const { user, loading: authLoading } = useAuth();
	const [status, setStatus] = useState<SubscriptionStatus | null>(null);
	const [loading, setLoading] = useState(true);

	const recheck = useCallback(async () => {
		if (!user?.userId) {
			setStatus(null);
			setLoading(false);
			return;
		}

		setLoading(true);
		try {
			const result = await checkSubscription(user.userId);
			setStatus(result);
		} catch {
			setStatus({
				isOnline: false,
				isActive: false,
				plan: "free",
				subscriptionStatus: "free",
				message: "Erro ao verificar assinatura.",
			});
		} finally {
			setLoading(false);
		}
	}, [user?.userId]);

	useEffect(() => {
		if (authLoading) return;

		recheck();

		const interval = setInterval(recheck, 5 * 60 * 1000);

		const handleOnline = () => recheck();
		window.addEventListener("online", handleOnline);

		return () => {
			clearInterval(interval);
			window.removeEventListener("online", handleOnline);
		};
	}, [authLoading, recheck]);

	const isBlocked = !loading && status !== null && !status.isActive;

	if (loading || authLoading) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
				<div className="text-center space-y-4">
					<div className="size-8 animate-spin rounded-full border-2 border-current border-t-transparent mx-auto" />
					<p className="text-muted-foreground">Verificando assinatura...</p>
				</div>
			</div>
		);
	}

	if (isBlocked && status) {
		const reason: "no-internet" | "expired" | "grace-period" | "pending" = !status.isOnline
			? "no-internet"
			: status.subscriptionStatus === "past_due"
				? "grace-period"
				: status.subscriptionStatus === "pending"
					? "pending"
					: "expired";

		return (
			<SubscriptionContext.Provider value={{ status, loading, isBlocked, recheck }}>
				<AccessBlocked
					reason={reason}
					onRetry={reason === "pending" ? () => { window.location.href = "/activate"; } : recheck}
				/>
			</SubscriptionContext.Provider>
		);
	}

	return (
		<SubscriptionContext.Provider value={{ status, loading, isBlocked, recheck }}>
			{children}
		</SubscriptionContext.Provider>
	);
}
