"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { CreditCard, HardDrive, Shield } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/supabase/auth-context";

import { addOns, computeOptions } from "./data";
import { ChangePlanDialog } from "./change-plan-dialog";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
);

type SubscriptionData = {
  plan: string;
  compute: string;
  pitr: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

const PLAN_NAMES: Record<string, string> = {
  free: "Gratuito",
  pro: "Pro",
  enterprise: "Enterprise",
};

const PLAN_PRICES: Record<string, number> = {
  pro: 930,
  enterprise: 22282.8,
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
          .select("plan, compute, pitr, subscription_status, current_period_end, cancel_at_period_end")
          .eq("id", user.id)
          .single();

        if (data) {
          setSubscription({
            plan: data.plan ?? "free",
            compute: data.compute ?? "medium",
            pitr: data.pitr ?? "none",
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
            compute: parsed.compute ?? "medium",
            pitr: parsed.pitr ?? "none",
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
  const compute = subscription?.compute ?? "medium";
  const pitr = subscription?.pitr ?? "none";
  const status = subscription?.status ?? "free";
  const planPrice = PLAN_PRICES[plan] ?? 0;
  const computeData = computeOptions.find((c) => c.id === compute);
  const computePrice = computeData?.price ?? 0;
  const pitrData = pitr !== "none" ? addOns.find((a) => a.id === pitr) : null;
  const pitrPrice = pitrData?.priceBRL ?? 0;
  const totalPrice = planPrice + computePrice + pitrPrice;
  const periodEnd = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString("pt-BR", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const handlePlanChanged = () => {
    // Re-read from localStorage after plan change
    try {
      const demoPlan = localStorage.getItem("bcrm_demo_plan");
      if (demoPlan) {
        const parsed = JSON.parse(demoPlan);
        setSubscription({
          plan: parsed.plan ?? "free",
          compute: parsed.compute ?? "medium",
          pitr: parsed.pitr ?? "none",
          status: parsed.status ?? "active",
          currentPeriodEnd: parsed.currentPeriodEnd ?? null,
          cancelAtPeriodEnd: false,
        });
      }
    } catch {
      // ignore
    }
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
          {/* Plano + Valor */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Plano</p>
              <p className="font-medium text-lg">{PLAN_NAMES[plan] ?? plan}</p>
            </div>
            {totalPrice > 0 && (
              <div className="text-right">
                <p className="text-muted-foreground text-sm">Valor Total</p>
                <p className="font-medium text-lg">
                  R$ {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                </p>
              </div>
            )}
          </div>

          {/* Compute */}
          {plan !== "free" && computeData && (
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
              <HardDrive className="size-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-muted-foreground text-xs">Compute</p>
                <p className="font-medium text-sm">
                  {computeData.size} — {computeData.cpu} / {computeData.ram}
                </p>
              </div>
              <span className="font-medium text-sm">
                + R$ {computePrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
          )}

          {/* PITR Backup */}
          {plan !== "free" && (
            <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
              <Shield className="size-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-muted-foreground text-xs">PITR Backup</p>
                <p className="font-medium text-sm">
                  {pitrData ? pitrData.name : "Backups diários (7 dias)"}
                </p>
              </div>
              {pitrData && (
                <span className="font-medium text-sm">
                  + R$ {pitrPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>
          )}

          {/* Próximo faturamento */}
          {periodEnd && (
            <div className="text-right">
              <p className="text-muted-foreground text-xs">
                {subscription?.cancelAtPeriodEnd ? "Cancela em" : "Próximo faturamento"}
              </p>
              <p className="font-medium text-sm">{periodEnd}</p>
            </div>
          )}

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
        currentCompute={compute}
        currentPitr={pitr}
        onPlanChanged={handlePlanChanged}
      />
    </>
  );
}
