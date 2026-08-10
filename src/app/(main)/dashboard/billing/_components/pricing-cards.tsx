"use client";

import { useState } from "react";

import { Check, CreditCard, Server, Zap } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCheckout } from "@/hooks/use-checkout";
import { useAuth } from "@/lib/supabase/auth-context";

import {
  billingIntervals,
  computeOptions,
  intervalPrice,
  intervalPricePerMonth,
  type BillingInterval,
  type Plan,
} from "./data";

type PricingCardsProps = {
  plans: Plan[];
  userEmail?: string;
  userId?: string;
};

export function PricingCards({ plans, userEmail, userId }: PricingCardsProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCompute, setSelectedCompute] = useState<string>("");
  const [selectedInterval, setSelectedInterval] = useState<BillingInterval>("monthly");
  const { checkout, loading } = useCheckout();
  const { isDemo } = useAuth();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setSelectedCompute("medium");
  };

  const handleCheckout = async () => {
    if (isDemo) {
      toast.error("Stripe não disponível no modo de demonstração. Faça login com uma conta real para assinar.");
      return;
    }
    if (!userEmail || !userId || !selectedPlan || !selectedCompute) {
      window.location.href = "/auth/v1/login";
      return;
    }
    await checkout({
      plan: selectedPlan,
      compute: selectedCompute,
      interval: selectedInterval,
      email: userEmail,
      userId,
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const intervalConfig = billingIntervals.find((i) => i.id === selectedInterval)!;
  const monthsLabel = selectedInterval === "quarterly" ? "3 meses" : selectedInterval === "annual" ? "1 ano" : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Billing Interval Selector */}
      <div className="flex flex-col items-center gap-3">
        <ToggleGroup
          type="single"
          value={selectedInterval}
          onValueChange={(value) => {
            if (value) setSelectedInterval(value as BillingInterval);
          }}
          className="rounded-lg border p-1"
        >
          {billingIntervals.map((interval) => (
            <ToggleGroupItem key={interval.id} value={interval.id} className="gap-2 px-4">
              {interval.label}
              {interval.discount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  -{Math.round(interval.discount * 100)}%
                </Badge>
              )}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        {monthsLabel && (
          <p className="text-muted-foreground text-sm">
            Paga de uma vez — {monthsLabel} adiantado, sem mensalidade
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => {
          const isExpanded = selectedPlan === plan.id;
          const compute = computeOptions.find((c) => c.id === selectedCompute);
          const planPricePerMonth = plan.monthlyPrice !== null ? intervalPricePerMonth(plan.monthlyPrice, selectedInterval) : 0;
          const computePricePerMonth = isExpanded && compute ? intervalPricePerMonth(compute.price, selectedInterval) : 0;
          const planTotalPerMonth = planPricePerMonth + computePricePerMonth;
          const planTotal = plan.monthlyPrice !== null ? intervalPrice(plan.monthlyPrice, selectedInterval) : 0;
          const computeTotal = isExpanded && compute ? intervalPrice(compute.price, selectedInterval) : 0;

          return (
            <Card key={plan.id} className={`flex flex-col ${plan.highlighted ? "border-primary shadow-md" : ""}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  {plan.badge && <Badge className="bg-primary text-primary-foreground text-xs">{plan.badge}</Badge>}
                </div>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                {/* Base Price */}
                <div className="flex items-baseline gap-1">
                  {plan.monthlyPrice !== null ? (
                    <>
                      <span className="text-muted-foreground text-sm">R$</span>
                      <span className="font-bold text-4xl">{formatPrice(planPricePerMonth)}</span>
                      <span className="text-muted-foreground text-sm">/mês</span>
                    </>
                  ) : (
                    <span className="font-bold text-4xl">Personalizado</span>
                  )}
                </div>

                {selectedInterval !== "monthly" && plan.monthlyPrice !== null && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <CreditCard className="size-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Total: R$ {formatPrice(planTotal + computeTotal)} ({monthsLabel} adiantado)
                    </span>
                  </div>
                )}

                {/* Base Features */}
                <div className="flex flex-col gap-2">
                  {plan.baseFeatures.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {plan.baseFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Extra Features (cumulative) */}
                  {plan.extraFeatures.length > 0 && (
                    <>
                      {plan.baseFeatures.length > 0 && <Separator className="my-1" />}
                      <p className="font-medium text-primary text-xs">
                        {plan.featureHeader ?? "Tudo no Plano anterior, mais:"}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {plan.extraFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span className="font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Compute Tier Selector (shown when plan is selected) */}
                {isExpanded && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Server className="size-4 text-muted-foreground" />
                        <p className="font-medium text-sm">Escolha o Compute</p>
                      </div>
                      <div className="grid gap-2">
                        {computeOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedCompute(opt.id)}
                            className={`flex items-center justify-between rounded-lg border p-3 text-left transition-all ${
                              selectedCompute === opt.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-muted-foreground/50"
                            }`}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">{opt.size}</span>
                              <span className="text-muted-foreground text-xs">
                                {opt.cpu} / {opt.ram} RAM
                                {opt.dedicated ? " (dedicado)" : ""}
                              </span>
                            </div>
                            <span className="font-medium text-sm">+ R$ {formatPrice(intervalPricePerMonth(opt.price, selectedInterval))}/mês</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">Plano + Compute</span>
                        <span className="font-bold text-lg">
                          R$ {formatPrice(planTotalPerMonth)}
                          <span className="font-normal text-muted-foreground text-sm">/mês</span>
                        </span>
                      </div>
                      {selectedInterval !== "monthly" && (
                        <div className="mt-1 flex items-center gap-1.5 text-xs">
                          <CreditCard className="size-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Total: R$ {formatPrice(planTotal + computeTotal)} ({monthsLabel} adiantado)
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="pt-4">
                {!isExpanded ? (
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={plan.monthlyPrice === null}
                  >
                    {isDemo ? "Indisponível no Demo" : plan.cta}
                  </Button>
                ) : (
                  <Button
                    className="w-full gap-2"
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={handleCheckout}
                    disabled={loading || !selectedCompute}
                  >
                    {loading ? (
                      "Processando..."
                    ) : (
                      <>
                        <Zap className="size-4" />
                        Assinar por R$ {formatPrice(planTotalPerMonth)}/mês
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
