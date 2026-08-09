"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { CreditCard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/supabase/auth-context";

import { ChangePlanDialog } from "./change-plan-dialog";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
);

type SubscriptionData = {
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

const PLAN_NAMES: Record<string, string> = {
  free: "Gratuito",
  starter: "Inicial",
  pro: "Pro",
  team: "Equipe",
};

const PLAN_PRICES: Record<string, number> = {
  starter: 899.9,
  pro: 2299.9,
  team: 8999.9,
};

export function CurrentPlan() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [changePlanOpen, setChangePlanOpen] = useState(false);

  useEffect(() => {
    async function fetchSubscription() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from("users")
          .select("plan, subscription_status, current_period_end, cancel_at_period_end")
          .eq("id", user.id)
          .single();

        if (data) {
          setSubscription({
            plan: data.plan ?? "free",
            status: data.subscription_status ?? "free",
            currentPeriodEnd: data.current_period_end,
            cancelAtPeriodEnd: data.cancel_at_period_end ?? false,
          });
          return;
        }
      } catch {
        // User might not exist in DB yet (demo mode)
      }

      // Fallback: check localStorage for demo plan
      try {
        const demoPlan = localStorage.getItem("bcrm_demo_plan");
        if (demoPlan) {
          const parsed = JSON.parse(demoPlan);
          setSubscription({
            plan: parsed.plan ?? "free",
            status: parsed.status ?? "active",
            currentPeriodEnd: parsed.currentPeriodEnd ?? null,
            cancelAtPeriodEnd: false,
          });
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [user?.id]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plano Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="size-6 animate-spin rounded-full border-2 border-current border-t-transparent text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const plan = subscription?.plan ?? "free";
  const status = subscription?.status ?? "free";
  const price = PLAN_PRICES[plan] ?? 0;
  const periodEnd = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString("pt-BR", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const handlePlanChanged = (newPlan: string) => {
    setSubscription((prev) => (prev ? { ...prev, plan: newPlan } : prev));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Plano Atual</CardTitle>
              <CardDescription>Sua assinatura ativa.</CardDescription>
            </div>
            <Badge
              variant="outline"
              className={
                status === "active"
                  ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
                  : "border-muted"
              }
            >
              {status === "active"
                ? "Ativo"
                : status === "past_due"
                  ? "Atrasado"
                  : status === "canceled"
                    ? "Cancelado"
                    : "Gratuito"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Plano</p>
              <p className="font-medium text-lg">{PLAN_NAMES[plan] ?? plan}</p>
            </div>
            {price > 0 && (
              <div className="text-right">
                <p className="text-muted-foreground text-sm">Valor</p>
                <p className="font-medium text-lg">
                  R$ {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                </p>
              </div>
            )}
            {periodEnd && (
              <div className="text-right">
                <p className="text-muted-foreground text-sm">
                  {subscription?.cancelAtPeriodEnd ? "Cancela em" : "Próximo faturamento"}
                </p>
                <p className="font-medium text-lg">{periodEnd}</p>
              </div>
            )}
          </div>

          {subscription?.cancelAtPeriodEnd && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-yellow-800 text-xs dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
              Sua assinatura será cancelada ao final do período. Você ainda tem acesso até {periodEnd}.
            </div>
          )}

          {plan === "free" && (
            <div className="rounded-lg border bg-muted/50 p-4 text-center text-muted-foreground text-sm">
              Você está no plano gratuito. Escolha um plano acima para desbloquear todos os recursos.
            </div>
          )}

          {plan !== "free" && (
            <Button variant="outline" onClick={() => setChangePlanOpen(true)} className="w-full">
              <CreditCard className="mr-2 size-4" />
              Alterar Plano
            </Button>
          )}
        </CardContent>
      </Card>

      <ChangePlanDialog
        open={changePlanOpen}
        onOpenChange={setChangePlanOpen}
        currentPlan={plan}
        onPlanChanged={handlePlanChanged}
      />
    </>
  );
}
