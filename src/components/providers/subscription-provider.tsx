"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { AccessBlocked } from "@/components/access-blocked";
import { useAuth } from "@/lib/auth/auth-context";
import { checkSubscription, type SubscriptionStatus } from "@/lib/subscription-check";

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
  recheck: async () => {
    // Default recheck - overridden by provider
  },
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

    recheck().catch(() => {
      // Ignore recheck errors
    });

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
        <div className="space-y-4 text-center">
          <div className="mx-auto size-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <p className="text-muted-foreground">Verificando assinatura...</p>
        </div>
      </div>
    );
  }

  if (isBlocked && status) {
    let reason: "no-internet" | "expired" | "grace-period" | "pending";
    if (!status.isOnline) {
      reason = "no-internet";
    } else if (status.subscriptionStatus === "past_due") {
      reason = "grace-period";
    } else if (status.subscriptionStatus === "pending") {
      reason = "pending";
    } else {
      reason = "expired";
    }

    return (
      <SubscriptionContext.Provider value={{ status, loading, isBlocked, recheck }}>
        <AccessBlocked
          reason={reason}
          onRetry={
            reason === "pending"
              ? () => {
                  window.location.href = "/activate";
                }
              : recheck
          }
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
