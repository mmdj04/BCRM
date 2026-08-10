"use client";

import { useState } from "react";

import { createClient } from "@supabase/supabase-js";
import { ArrowRight, Check, CreditCard, Server, Zap } from "lucide-react";

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
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/lib/supabase/auth-context";

import { computeOptions, getAllPlanFeatures, getComputePrice, plans } from "./data";

const PLAN_NAMES: Record<string, string> = {
  free: "Gratuito",
  pro: "Pro",
  enterprise: "Enterprise",
};

type ChangePlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  onPlanChanged: (newPlan: string) => void;
};

function ChangePlanContent({
  currentPlan,
  selectedPlan,
  selectedCompute,
  changeTiming,
  success,
  onSelectPlan,
  onSelectCompute,
  onChangeTiming,
}: {
  currentPlan: string;
  selectedPlan: string;
  selectedCompute: string;
  changeTiming: "now" | "period_end";
  success: boolean;
  onSelectPlan: (id: string) => void;
  onSelectCompute: (id: string) => void;
  onChangeTiming: (v: "now" | "period_end") => void;
}) {
  const newPlanData = plans.find((p) => p.id === selectedPlan);

  const availablePlans = plans.filter((p) => p.id !== currentPlan && p.monthlyPrice !== null);

  const currentFeatures = getAllPlanFeatures(currentPlan);
  const newFeatures = selectedPlan ? getAllPlanFeatures(selectedPlan) : [];

  const benefitsGained = newFeatures.filter((f) => !currentFeatures.includes(f));
  const benefitsLost = currentFeatures.filter((f) => !newFeatures.includes(f));

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const currentComputePrice = getComputePrice("medium");
  const newComputePrice = getComputePrice(selectedCompute);

  if (success) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col gap-4">
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
              R${" "}
              {formatPrice(
                (PLAN_NAMES[currentPlan] ? (plans.find((p) => p.id === currentPlan)?.monthlyPrice ?? 0) : 0) +
                  currentComputePrice,
              )}
              /mês
            </p>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="flex flex-col gap-3">
        <Label className="font-medium">Selecione o novo plano</Label>
        <RadioGroup value={selectedPlan} onValueChange={onSelectPlan} className="flex flex-col gap-3">
          {availablePlans.map((plan) => {
            const isUpgrade = (plan.monthlyPrice ?? 0) > (plans.find((p) => p.id === currentPlan)?.monthlyPrice ?? 0);
            return (
              // biome-ignore lint/a11y/noLabelWithoutControl: Radix RadioGroup handles association internally
              <label
                key={plan.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                {/* biome-ignore lint/a11y/noLabelWithoutControl: Radix RadioGroup handles association internally */}
                <RadioGroupItem value={plan.id} aria-label={plan.name} />
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
                  <p className="mt-1 font-medium text-sm">R$ {formatPrice(plan.monthlyPrice ?? 0)}/mês + Compute</p>
                </div>
              </label>
            );
          })}
        </RadioGroup>
      </div>

      {selectedPlan && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Server className="size-4 text-muted-foreground" />
            <Label className="font-medium">Escolha o Compute</Label>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8" />
                  <TableHead>Tamanho</TableHead>
                  <TableHead className="text-right">R$/mês</TableHead>
                  <TableHead>CPU</TableHead>
                  <TableHead>Dedicado</TableHead>
                  <TableHead>RAM</TableHead>
                  <TableHead className="text-right">Conex. Diretas</TableHead>
                  <TableHead className="text-right">Conex. Pooler</TableHead>
                  <TableHead className="hidden min-w-[280px] lg:table-cell">Benefícios</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {computeOptions.map((option) => {
                  const isSelected = selectedCompute === option.id;
                  return (
                    <TableRow
                      key={option.id}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"
                      }`}
                      onClick={() => onSelectCompute(option.id)}
                    >
                      <TableCell className="w-8 pr-0">
                        <div
                          className={`flex size-5 items-center justify-center rounded-full border-2 transition-colors ${
                            isSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {isSelected && <Check className="size-3" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{option.size}</TableCell>
                      <TableCell className="text-right font-medium">R$ {formatPrice(option.price)}</TableCell>
                      <TableCell>{option.cpu}</TableCell>
                      <TableCell>{option.dedicated ? "Sim" : "Não"}</TableCell>
                      <TableCell>{option.ram}</TableCell>
                      <TableCell className="text-right">{option.directConnections}</TableCell>
                      <TableCell className="text-right">{option.poolerConnections.toLocaleString()}</TableCell>
                      <TableCell className="hidden min-w-[280px] lg:table-cell">
                        <ul className="flex flex-col gap-0.5">
                          {option.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-1 text-muted-foreground text-xs">
                              <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {selectedCompute && (
            <div className="lg:hidden">
              {computeOptions
                .filter((o) => o.id === selectedCompute)
                .map((option) => (
                  <div key={option.id} className="rounded-lg border bg-muted/30 p-3">
                    <p className="mb-2 font-medium text-sm">Benefícios — {option.size}</p>
                    <ul className="flex flex-col gap-1">
                      {option.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-1.5 text-muted-foreground text-xs">
                          <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Benefits Comparison */}
      {selectedPlan && (
        <div className="grid gap-4 sm:grid-cols-2">
          {benefitsGained.length > 0 && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
              <p className="mb-2 font-medium text-green-800 text-sm dark:text-green-200">Benefícios Adicionados</p>
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
              <p className="mb-2 font-medium text-yellow-800 text-sm dark:text-yellow-200">Benefícios Removidos</p>
              <ul className="flex flex-col gap-1">
                {benefitsLost.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-1.5 text-yellow-700 text-xs dark:text-yellow-300">
                    <span className="mt-0.5 size-3 shrink-0">⚠</span>
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
          <RadioGroup value={changeTiming} onValueChange={(v) => onChangeTiming(v as "now" | "period_end")}>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: Radix RadioGroup handles association internally */}
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50">
              <RadioGroupItem value="period_end" aria-label="Ao final do período atual" />
              <div>
                <p className="font-medium text-sm">Ao final do período atual</p>
                <p className="text-muted-foreground text-xs">
                  A alteração será aplicada quando a assinatura atual vencer.
                </p>
              </div>
            </label>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: Radix RadioGroup handles association internally */}
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50">
              <RadioGroupItem value="now" aria-label="Agora (instantâneo)" />
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
              R$ {formatPrice((newPlanData.monthlyPrice ?? 0) + newComputePrice)}/mês
            </span>
          </div>
          <p className="mt-2 text-muted-foreground text-xs">
            {changeTiming === "now"
              ? "A alteração será aplicada imediatamente."
              : "A alteração entrará em vigor ao final do período atual."}
          </p>
        </div>
      )}
    </div>
  );
}

export function ChangePlanDialog({ open, onOpenChange, currentPlan, onPlanChanged }: ChangePlanDialogProps) {
  const { user, isDemo } = useAuth();
  const isMobile = useIsMobile();
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedCompute, setSelectedCompute] = useState<string>("");
  const [changeTiming, setChangeTiming] = useState<"now" | "period_end">("period_end");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setSelectedCompute("medium");
  };

  const handleConfirmChange = async () => {
    if (!selectedPlan || !user?.id) return;

    setLoading(true);
    try {
      if (isDemo) {
        const demoPlan = localStorage.getItem("bcrm_demo_plan");
        const parsed = demoPlan ? JSON.parse(demoPlan) : {};
        localStorage.setItem(
          "bcrm_demo_plan",
          JSON.stringify({
            ...parsed,
            plan: selectedPlan,
            compute: selectedCompute,
            status: "active",
          }),
        );
        setSuccess(true);
        setTimeout(() => {
          onPlanChanged(selectedPlan);
          onOpenChange(false);
          setSuccess(false);
          setSelectedPlan("");
          setSelectedCompute("");
        }, 1500);
      } else {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          await supabase.from("users").upsert(
            {
              id: user.id,
              plan: selectedPlan,
              compute: selectedCompute,
              plan_interval: "monthly",
              subscription_status: "active",
              current_period_end: changeTiming === "now" ? periodEnd : undefined,
            },
            { onConflict: "id" },
          );
        }
        setSuccess(true);
        setTimeout(() => {
          onPlanChanged(selectedPlan);
          onOpenChange(false);
          setSuccess(false);
          setSelectedPlan("");
          setSelectedCompute("");
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
      setSelectedCompute("");
      setChangeTiming("period_end");
      setSuccess(false);
    }
    onOpenChange(value);
  };

  const contentProps = {
    currentPlan,
    selectedPlan,
    selectedCompute,
    changeTiming,
    success,
    onSelectPlan: handleSelectPlan,
    onSelectCompute: setSelectedCompute,
    onChangeTiming: setChangeTiming,
  };

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="bottom" className="flex max-h-[85vh] flex-col overflow-hidden p-0">
          <SheetHeader className="px-4 pt-4 pb-0">
            <SheetTitle className="flex items-center gap-2">
              <CreditCard className="size-5" />
              Alterar Plano
            </SheetTitle>
            <SheetDescription>Escolha o novo plano que melhor se adapta às suas necessidades.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ChangePlanContent {...contentProps} />
          </div>
          <SheetFooter className="px-4 pb-4 pt-0">
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            {!success && (
              <Button onClick={handleConfirmChange} disabled={!selectedPlan || !selectedCompute || loading}>
                {loading ? "Processando..." : "Confirmar Alteração"}
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl" style={{ maxWidth: "min(42rem, calc(100% - 2rem))" }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Alterar Plano
          </DialogTitle>
          <DialogDescription>Escolha o novo plano que melhor se adapta às suas necessidades.</DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto">
          <ChangePlanContent {...contentProps} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          {!success && (
            <Button onClick={handleConfirmChange} disabled={!selectedPlan || !selectedCompute || loading}>
              {loading ? "Processando..." : "Confirmar Alteração"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
