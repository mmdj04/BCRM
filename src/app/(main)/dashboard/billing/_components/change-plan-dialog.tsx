"use client";

import { useState } from "react";

import { ArrowRight, Check, CreditCard, Info, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/supabase/auth-context";
import { createClient } from "@supabase/supabase-js";

import { plans } from "./data";

const PLAN_NAMES: Record<string, string> = {
  free: "Gratuito",
  starter: "Inicial",
  pro: "Pro",
  team: "Equipe",
};

const PLAN_PRICES: Record<string, number> = {
  starter: 789.9,
  pro: 1889.9,
  team: 7989.9,
};

const PLAN_FEATURES: Record<string, string[]> = {
  starter: [
    "2 projetos ativos",
    "50.000 usuários ativos mensais",
    "500 MB de banco de dados",
    "5 GB de largura de banda",
    "1 GB de armazenamento",
    "Suporte da comunidade",
  ],
  pro: [
    "Projetos ilimitados",
    "100.000 usuários ativos mensais",
    "8 GB de banco por projeto",
    "250 GB de largura de banda",
    "100 GB de armazenamento",
    "Suporte por e-mail",
    "Backups diários (7 dias)",
    "SSO/SAML (50 incluídos)",
  ],
  team: [
    "Tudo do Pro",
    "SOC2 e ISO 27001",
    "Conformidade HIPAA",
    "SSO para dashboard",
    "Suporte prioritário por e-mail e SLAs",
    "Backups (14 dias)",
    "Funções de acesso personalizadas",
    "AWS PrivateLink",
  ],
};

type ChangePlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  onPlanChanged: (newPlan: string) => void;
};

export function ChangePlanDialog({ open, onOpenChange, currentPlan, onPlanChanged }: ChangePlanDialogProps) {
  const { user, isDemo } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [changeTiming, setChangeTiming] = useState<"now" | "period_end">("period_end");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const currentPlanData = plans.find((p) => p.id === currentPlan);
  const newPlanData = plans.find((p) => p.id === selectedPlan);

  const availablePlans = plans.filter((p) => p.id !== currentPlan && p.id !== "enterprise" && p.monthlyPrice !== null);

  const getBenefitsGained = () => {
    if (!selectedPlan || !currentPlan) return [];
    const currentFeatures = PLAN_FEATURES[currentPlan] || [];
    const newFeatures = PLAN_FEATURES[selectedPlan] || [];
    return newFeatures.filter((f) => !currentFeatures.includes(f));
  };

  const getBenefitsLost = () => {
    if (!selectedPlan || !currentPlan) return [];
    const currentFeatures = PLAN_FEATURES[currentPlan] || [];
    const newFeatures = PLAN_FEATURES[selectedPlan] || [];
    return currentFeatures.filter((f) => !newFeatures.includes(f));
  };

  const benefitsGained = getBenefitsGained();
  const benefitsLost = getBenefitsLost();

  const handleConfirmChange = async () => {
    if (!selectedPlan || !user?.id) return;

    setLoading(true);
    try {
      if (isDemo) {
        // Demo mode: update localStorage
        const demoPlan = localStorage.getItem("bcrm_demo_plan");
        const parsed = demoPlan ? JSON.parse(demoPlan) : {};
        localStorage.setItem("bcrm_demo_plan", JSON.stringify({
          ...parsed,
          plan: selectedPlan,
          status: "active",
        }));
        setSuccess(true);
        setTimeout(() => {
          onPlanChanged(selectedPlan);
          onOpenChange(false);
          setSuccess(false);
          setSelectedPlan("");
        }, 1500);
      } else {
        // Real mode: update Supabase directly
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          await supabase.from("users").upsert({
            id: user.id,
            plan: selectedPlan,
            plan_interval: "monthly",
            subscription_status: "active",
            current_period_end: changeTiming === "now" ? periodEnd : undefined,
          }, { onConflict: "id" });
        }
        setSuccess(true);
        setTimeout(() => {
          onPlanChanged(selectedPlan);
          onOpenChange(false);
          setSuccess(false);
          setSelectedPlan("");
        }, 1500);
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSelectedPlan("");
      setChangeTiming("period_end");
      setSuccess(false);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Alterar Plano
          </DialogTitle>
          <DialogDescription>
            Escolha o novo plano que melhor se adapta às suas necessidades.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Check className="size-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="font-medium text-lg">Plano alterado com sucesso!</p>
            <p className="text-muted-foreground text-sm">
              {changeTiming === "now"
                ? "A alteração já está ativa."
                : "A alteração entrará em vigor ao final do período atual."}
            </p>
          </div>
        ) : (
          <>
            {/* Current Plan */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Plano Atual</p>
                  <p className="font-medium text-lg">{PLAN_NAMES[currentPlan] ?? currentPlan}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Valor</p>
                  <p className="font-medium text-lg">
                    R$ {(PLAN_PRICES[currentPlan] ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                  </p>
                </div>
              </div>
            </div>

            {/* Available Plans */}
            <div className="flex flex-col gap-3">
              <Label className="font-medium">Selecione o novo plano</Label>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="flex flex-col gap-3">
                {availablePlans.map((plan) => {
                  const isUpgrade = (PLAN_PRICES[plan.id] ?? 0) > (PLAN_PRICES[currentPlan] ?? 0);
                  return (
                    <label
                      key={plan.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${
                        selectedPlan === plan.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <RadioGroupItem value={plan.id} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{plan.name}</span>
                          {plan.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {plan.badge}
                            </Badge>
                          )}
                          <Badge variant={isUpgrade ? "default" : "outline"} className="text-xs">
                            {isUpgrade ? "Upgrade" : "Downgrade"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{plan.description}</p>
                        <p className="mt-1 font-medium text-sm">
                          R$ {plan.monthlyPrice!.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                        </p>
                      </div>
                    </label>
                  );
                })}
              </RadioGroup>
            </div>

            {/* Benefits Comparison */}
            {selectedPlan && (
              <div className="grid gap-4 sm:grid-cols-2">
                {benefitsGained.length > 0 && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
                    <p className="mb-2 font-medium text-green-800 text-sm dark:text-green-200">
                      Benefícios Adicionados
                    </p>
                    <ul className="flex flex-col gap-1">
                      {benefitsGained.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-1.5 text-green-700 text-xs dark:text-green-300">
                          <Check className="mt-0.5 size-3 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {benefitsLost.length > 0 && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950">
                    <p className="mb-2 font-medium text-yellow-800 text-sm dark:text-yellow-200">
                      Benefícios Removidos
                    </p>
                    <ul className="flex flex-col gap-1">
                      {benefitsLost.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-1.5 text-yellow-700 text-xs dark:text-yellow-300">
                          <Info className="mt-0.5 size-3 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Change Timing */}
            {selectedPlan && (
              <div className="flex flex-col gap-3">
                <Label className="font-medium">Quando aplicar a alteração?</Label>
                <RadioGroup value={changeTiming} onValueChange={(v) => setChangeTiming(v as "now" | "period_end")}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50">
                    <RadioGroupItem value="period_end" />
                    <div>
                      <p className="font-medium text-sm">Ao final do período atual</p>
                      <p className="text-muted-foreground text-xs">
                        A alteração será aplicada quando a assinatura atual vencer.
                      </p>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50">
                    <RadioGroupItem value="now" />
                    <div className="flex items-center gap-2">
                      <Zap className="size-4 text-orange-500" />
                      <div>
                        <p className="font-medium text-sm">Agora (instantâneo)</p>
                        <p className="text-muted-foreground text-xs">
                          A alteração será aplicada imediatamente. Valor proporcional será ajustado.
                        </p>
                      </div>
                    </div>
                  </label>
                </RadioGroup>
              </div>
            )}

            {/* Summary */}
            {selectedPlan && newPlanData && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <h4 className="mb-2 font-medium text-sm">Resumo da Alteração</h4>
                <div className="flex items-center gap-3 text-sm">
                  <span>{PLAN_NAMES[currentPlan]}</span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                  <span className="font-medium">{newPlanData.name}</span>
                  <span className="ml-auto font-medium">
                    R$ {newPlanData.monthlyPrice!.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                  </span>
                </div>
                <p className="mt-2 text-muted-foreground text-xs">
                  {changeTiming === "now"
                    ? "A alteração será aplicada imediatamente."
                    : "A alteração entrará em vigor ao final do período atual."}
                </p>
              </div>
            )}
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          {!success && (
            <Button onClick={handleConfirmChange} disabled={!selectedPlan || loading}>
              {loading ? "Processando..." : "Confirmar Alteração"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
