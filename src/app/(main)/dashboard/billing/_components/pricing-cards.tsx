"use client";

import { useState } from "react";

import { Check, Server, Zap } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCheckout } from "@/hooks/use-checkout";
import { useAuth } from "@/lib/supabase/auth-context";

import { computeOptions, type Plan } from "./data";

type PricingCardsProps = {
  plans: Plan[];
  userEmail?: string;
  userId?: string;
};

export function PricingCards({ plans, userEmail, userId }: PricingCardsProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedCompute, setSelectedCompute] = useState<string>("");
  const { checkout, loading } = useCheckout();
  const { isDemo } = useAuth();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find((p) => p.id === planId);
    if (plan && plan.allowedCompute.length > 0) {
      setSelectedCompute(plan.allowedCompute[0]);
    }
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
      interval: "monthly",
      email: userEmail,
      userId,
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getComputeForPlan = (plan: Plan) => {
    return computeOptions.filter((c) => plan.allowedCompute.includes(c.id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        {plans.map((plan) => {
          const isExpanded = selectedPlan === plan.id;
          const allowedCompute = getComputeForPlan(plan);
          const compute = computeOptions.find((c) => c.id === selectedCompute);
          const planComputePrice = isExpanded && compute ? compute.price : 0;
          const planTotal = (plan.monthlyPrice ?? 0) + planComputePrice;

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
                      <span className="font-bold text-4xl">{formatPrice(plan.monthlyPrice)}</span>
                      <span className="text-muted-foreground text-sm">/mês</span>
                    </>
                  ) : (
                    <span className="font-bold text-4xl">Personalizado</span>
                  )}
                </div>

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
                        {allowedCompute.map((opt) => (
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
                            <span className="font-medium text-sm">+ R$ {formatPrice(opt.price)}/mês</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">Plano + Compute</span>
                        <span className="font-bold text-lg">
                          R$ {formatPrice(planTotal)}
                          <span className="font-normal text-muted-foreground text-sm">/mês</span>
                        </span>
                      </div>
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
                        Assinar por R$ {formatPrice(planTotal)}/mês
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
